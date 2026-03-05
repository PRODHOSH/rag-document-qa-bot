// content.js — runs in every page context
// Handles text extraction for both web pages and local files opened in Chrome

// ── Message handler ──────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {

  if (request.action === "getPageText") {
    const { title, text, fileType } = extractCurrentPage();
    sendResponse({ title, text, fileType });
  }

  if (request.action === "getFileContext") {
    const result = extractCurrentPage();
    sendResponse(result);
  }

  if (request.action === "detectFile") {
    const url    = window.location.href;
    const isFile = url.startsWith("file://");
    const isPDF  = url.toLowerCase().endsWith(".pdf") || document.contentType === "application/pdf";
    const title  = document.title || url.split("/").pop() || "document";
    sendResponse({ isFile, isPDF, title, url });
  }

  return true; // keep channel open
});

// ── Core extraction ───────────────────────────────────────────────────────────
function extractCurrentPage() {
  const url      = window.location.href;
  const isFile   = url.startsWith("file://");
  const fileName = url.split("/").pop().split("?")[0] || "document";
  const isPDF    = fileName.toLowerCase().endsWith(".pdf")
                   || document.contentType === "application/pdf";

  // PDF in Chrome's built-in viewer: DOM doesn't expose text
  if (isPDF) {
    return { title: fileName, text: "", fileType: "pdf", isPDF: true };
  }

  // Local text file via file:// — Chrome wraps it in <pre>
  if (isFile) {
    const pre  = document.querySelector("pre");
    const text = pre
      ? (pre.innerText || pre.textContent || "")
      : (document.body ? document.body.innerText : "");
    return {
      title:    fileName,
      text:     text.slice(0, 80000),
      fileType: fileName.split(".").pop().toLowerCase() || "txt",
      isPDF:    false,
    };
  }

  // Regular web page
  return {
    title:    document.title || window.location.hostname,
    text:     (document.body ? document.body.innerText : "").slice(0, 80000),
    fileType: "webpage",
    isPDF:    false,
  };
}
