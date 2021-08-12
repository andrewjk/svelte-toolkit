
export function addDocumentEvent(type, listener) {
  if (typeof document !== 'undefined') {
    document.addEventListener(type, listener);
  }
}

export function removeDocumentEvent(type, listener) {
  if (typeof document !== 'undefined') {
    document.removeEventListener(type, listener);
  }
}
