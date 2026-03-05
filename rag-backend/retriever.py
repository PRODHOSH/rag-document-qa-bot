"""
retriever.py
------------
Loads the FAISS index built by ingest.py and performs
top-k semantic similarity search for a given query.
"""

import os
import pickle
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

# ── Config ────────────────────────────────────────────────
_HERE      = os.path.dirname(os.path.abspath(__file__))
INDEX_DIR  = os.path.join(_HERE, "index")
MODEL_NAME = "all-MiniLM-L6-v2"   # must match ingest.py
# ──────────────────────────────────────────────────────────

_model:  SentenceTransformer | None = None
_index:  faiss.Index | None = None
_chunks: list[dict] | None = None


def _load():
    """Lazy-load model + index once, reuse on every request."""
    global _model, _index, _chunks

    if _model is None:
        print("[retriever] Loading embedding model ...")
        _model = SentenceTransformer(MODEL_NAME)

    if _index is None:
        index_path  = os.path.join(INDEX_DIR, "faiss.index")
        chunks_path = os.path.join(INDEX_DIR, "chunks.pkl")

        if not os.path.exists(index_path):
            raise FileNotFoundError(
                "FAISS index not found. Run  python ingest.py  first."
            )

        print("[retriever] Loading FAISS index ...")
        _index = faiss.read_index(index_path)

        with open(chunks_path, "rb") as f:
            _chunks = pickle.load(f)

        print(f"[retriever] Ready — {_index.ntotal} vectors indexed.")


def _l2_to_score(distance: float) -> float:
    """
    Convert L2 distance → similarity score in [0, 1].
    Lower distance = higher score.
    """
    return round(float(1 / (1 + distance)), 4)


def retrieve(query: str, k: int = 5) -> list[dict]:
    """
    Return the top-k most relevant chunks for `query`.

    Each result dict:
        {
            "text":     str,    # full chunk text
            "source":   str,    # filename
            "chunk_id": int,
            "score":    float,  # similarity 0–1 (higher = better)
        }
    """
    _load()

    # Embed the query with the same model
    query_vec = _model.encode([query])
    query_vec = np.array(query_vec, dtype="float32")

    # FAISS search
    distances, indices = _index.search(query_vec, k)

    results = []
    for dist, idx in zip(distances[0], indices[0]):
        if idx == -1:          # FAISS returns -1 when index has < k items
            continue
        chunk = dict(_chunks[idx])   # copy so we don't mutate stored data
        chunk["score"] = _l2_to_score(dist)
        results.append(chunk)

    # Sort by score descending (should already be, but be explicit)
    results.sort(key=lambda x: x["score"], reverse=True)
    return results


def reset():
    """Drop the cached index/model so the next request reloads from disk."""
    global _model, _index, _chunks
    _index  = None
    _chunks = None
    # keep _model — no need to re-download the weights
    print("[retriever] Index cache cleared — will reload on next request.")
