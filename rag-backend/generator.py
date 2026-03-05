"""
generator.py
------------
Calls the Groq LLM (llama3-8b-8192) with a strict RAG prompt.
Returns { answer, sources, confidence } or a hard fallback when
the retrieved context isn't relevant enough.
"""

import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# ── Config ────────────────────────────────────────────────
GROQ_MODEL       = "llama-3.1-8b-instant"
TEMPERATURE      = 0.2
SCORE_THRESHOLD  = 0.35   # below this → "I don't know"
HIGH_CONFIDENCE  = 0.75
MED_CONFIDENCE   = 0.50
# ──────────────────────────────────────────────────────────

NO_ANSWER = (
    "I could not find this in the provided documents. "
    "Can you share the relevant document?"
)

_client: Groq | None = None


def _get_client() -> Groq:
    global _client
    if _client is None:
        api_key = os.getenv("GROQ_API_KEY", "")
        if not api_key:
            raise ValueError(
                "GROQ_API_KEY is not set. Add it to rag-backend/.env"
            )
        _client = Groq(api_key=api_key)
    return _client


def get_confidence(top_score: float) -> str:
    """Map a similarity score to a human-readable confidence label."""
    if top_score >= HIGH_CONFIDENCE:
        return "high"
    if top_score >= MED_CONFIDENCE:
        return "medium"
    return "low"


def generate(query: str, retrieved: list[dict]) -> dict:
    """
    Build an answer from retrieved chunks using the Groq LLM.

    Parameters
    ----------
    query     : user question
    retrieved : output from retriever.retrieve()

    Returns
    -------
    {
        "answer":     str,
        "sources":    [{ "document": str, "snippet": str, "score": float }],
        "confidence": "high" | "medium" | "low"
    }
    """
    # ── No results or low relevance → hard fallback ────────
    if not retrieved or retrieved[0]["score"] < SCORE_THRESHOLD:
        return {
            "answer":     NO_ANSWER,
            "sources":    [],
            "confidence": "low",
        }

    top_score = retrieved[0]["score"]

    # ── Build context string ───────────────────────────────
    context_parts = []
    for i, chunk in enumerate(retrieved, start=1):
        context_parts.append(
            f"[Source {i}: {chunk['source']}]\n{chunk['text']}"
        )
    context = "\n\n---\n\n".join(context_parts)

    # ── System prompt ──────────────────────────────────────
    system_prompt = (
        "You are a precise question-answering assistant. "
        "Answer the user's question using ONLY the context provided below. "
        "Do not use any outside knowledge. "
        "If the context does not contain enough information to answer, "
        f'say exactly: "{NO_ANSWER}"'
    )

    user_prompt = (
        f"Context:\n{context}\n\n"
        f"Question: {query}\n\n"
        "Answer (based strictly on the context above):"
    )

    # ── Call Groq ──────────────────────────────────────────
    client = _get_client()
    response = client.chat.completions.create(
        model=GROQ_MODEL,
        temperature=TEMPERATURE,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_prompt},
        ],
    )

    answer = response.choices[0].message.content.strip()

    # ── Format sources ─────────────────────────────────────
    sources = [
        {
            "document": chunk["source"],
            "snippet":  chunk["text"][:200].strip(),   # first 200 chars
            "score":    chunk["score"],
        }
        for chunk in retrieved
    ]

    return {
        "answer":     answer,
        "sources":    sources,
        "confidence": get_confidence(top_score),
    }
