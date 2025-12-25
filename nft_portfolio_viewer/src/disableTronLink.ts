/**
 * Prevent the TronLink extension from throwing a read‑only property error.
 *
 * The extension injects `window.tronWeb` as a read‑only property.  
 * When our app loads, we replace it with a writable dummy object so the
 * extension can safely assign to it without throwing.
 *
 * This file is imported in `main.tsx` before React renders.
 */
if (typeof window !== 'undefined') {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(window, 'tronWeb');
    if (descriptor && !descriptor.writable) {
      Object.defineProperty(window, 'tronWeb', {
        value: {},
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }
  } catch {
    // Silently ignore any unexpected errors – the app should still run.
  }

  // Global error handler to swallow any remaining tronWeb errors.
  window.addEventListener('error', (e) => {
    if (e.message && e.message.includes('tronWeb')) {
      e.preventDefault();
    }
  });
}
