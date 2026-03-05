# RAG Backend

Retrieval-Augmented Generation (RAG) API built with **FastAPI**, **FAISS**, **Sentence Transformers**, and **Groq (llama3-8b-8192)**.

## File Structure

```
rag-backend/
├── docs/               ← Drop your .txt / .md / .pdf files here
├── index/              ← Auto-created by ingest.py (faiss.index + chunks.pkl)
├── ingest.py           ← One-time indexing script
├── retriever.py        ← FAISS similarity search
├── generator.py        ← Groq LLM answer generation
├── main.py             ← FastAPI app
├── requirements.txt
└── .env                ← Add your GROQ_API_KEY here
```

## Setup

### 1. Create a virtual environment

```bash
cd rag-backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac / Linux
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Add your Groq API key

Open `.env` and replace the placeholder:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get a free key at https://console.groq.com

### 4. Add your documents

Drop `.txt`, `.md`, or `.pdf` files into the `docs/` folder.  
A sample file `docs/product-overview.txt` is included to test with.

### 5. Build the index

```bash
python ingest.py
```

This creates `index/faiss.index` and `index/chunks.pkl`.  
Re-run whenever you add or change documents.

### 6. Start the API server

```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

### `POST /ask`

Ask a question grounded in your documents.

**Request**
```json
{ "question": "What is the refund policy?" }
```

**Response**
```json
{
  "answer": "If a developer is unresponsive or fails to deliver in the first week, Top Devs will issue a full refund or offer a free replacement within 48 hours.",
  "sources": [
    {
      "document": "product-overview.txt",
      "snippet": "If a developer is unresponsive or fails to deliver...",
      "score": 0.87
    }
  ],
  "confidence": "high"
}
```

### `GET /health`

```json
{ "status": "ok", "vectors": 42 }
```

## Confidence Levels

| Score        | Confidence |
|-------------|------------|
| ≥ 0.75      | high       |
| 0.50 – 0.74 | medium     |
| < 0.50      | low        |

If the top score is below **0.35**, the API returns:
> *"I could not find this in the provided documents. Can you share the relevant document?"*

## Connecting to the Frontend

Your Next.js frontend can call this API:

```ts
const res = await fetch("http://localhost:8000/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question: userInput }),
});
const data = await res.json();
// data.answer, data.sources, data.confidence
```
