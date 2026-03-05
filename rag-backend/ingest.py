"""
ingest.py
---------
Reads all documents from docs/, chunks them, generates embeddings,
and saves a FAISS index + chunk metadata to index/.

Run once (and re-run whenever docs change):
    python ingest.py
"""

import os
import pickle
import numpy as np
import faiss
import fitz  # pymupdf — handles PDFs
from sentence_transformers import SentenceTransformer

# ── Config ────────────────────────────────────────────────
_HERE      = os.path.dirname(os.path.abspath(__file__))
DOCS_DIR   = os.path.join(_HERE, "docs")
INDEX_DIR  = os.path.join(_HERE, "index")
MODEL_NAME = "all-MiniLM-L6-v2"   # fast, lightweight, good quality
CHUNK_SIZE = 500                   # words per chunk
OVERLAP    = 50                    # word overlap between chunks
# ──────────────────────────────────────────────────────────


def read_file(path: str) -> str:
    """Return plain text from .txt, .md, or .pdf."""
    if path.endswith(".pdf"):
        doc = fitz.open(path)
        return "\n".join(page.get_text() for page in doc)
    # .txt and .md
    with open(path, encoding="utf-8", errors="ignore") as f:
        return f.read()


def chunk_text(text: str, filename: str) -> list[dict]:
    """
    Split text into overlapping word-level chunks.
    Each chunk keeps its source filename for citation.
    """
    words = text.split()
    chunks = []
    step = CHUNK_SIZE - OVERLAP

    for i in range(0, len(words), step):
        chunk_words = words[i : i + CHUNK_SIZE]
        if len(chunk_words) < 20:          # skip tiny trailing fragments
            continue
        chunks.append({
            "text":   " ".join(chunk_words),
            "source": filename,
            "chunk_id": len(chunks),
        })

    return chunks


def ingest():
    os.makedirs(INDEX_DIR, exist_ok=True)
    os.makedirs(DOCS_DIR, exist_ok=True)

    # ── 1. Load & chunk all documents ─────────────────────
    all_chunks: list[dict] = []
    supported = (".txt", ".md", ".pdf")

    files = [f for f in os.listdir(DOCS_DIR) if f.lower().endswith(supported)]
    if not files:
        print(f"No documents found in {DOCS_DIR}/  — add .txt / .md / .pdf files and re-run.")
        return

    print(f"Found {len(files)} file(s): {files}")

    for fname in files:
        fpath = os.path.join(DOCS_DIR, fname)
        print(f"  Reading {fname} ...")
        text = read_file(fpath)
        chunks = chunk_text(text, fname)
        all_chunks.extend(chunks)
        print(f"    → {len(chunks)} chunks")

    print(f"\nTotal chunks: {len(all_chunks)}")

    # ── 2. Generate embeddings ─────────────────────────────
    print(f"\nLoading embedding model: {MODEL_NAME} ...")
    model = SentenceTransformer(MODEL_NAME)

    texts = [c["text"] for c in all_chunks]
    print("Encoding chunks (this may take a minute on first run) ...")
    embeddings = model.encode(texts, show_progress_bar=True, batch_size=64)
    embeddings = np.array(embeddings, dtype="float32")

    # ── 3. Build FAISS index ───────────────────────────────
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)   # exact L2 search — fine for < 100k chunks
    index.add(embeddings)
    print(f"\nFAISS index built: {index.ntotal} vectors, dim={dim}")

    # ── 4. Save to disk ────────────────────────────────────
    index_path  = os.path.join(INDEX_DIR, "faiss.index")
    chunks_path = os.path.join(INDEX_DIR, "chunks.pkl")

    faiss.write_index(index, index_path)
    with open(chunks_path, "wb") as f:
        pickle.dump(all_chunks, f)

    print(f"\n✓ Saved index  → {index_path}")
    print(f"✓ Saved chunks → {chunks_path}")
    print("\nIngestion complete. You can now start the API with:")
    print("  uvicorn main:app --reload --port 8000")


if __name__ == "__main__":
    ingest()
