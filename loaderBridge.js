// src/loaderBridge.js
// Tells the inline AutomateMind loader (index.html) that the first screen is mounted.
// The loader then waits for fonts + above-the-fold images (capped) and plays its exit.
export function signalAppReady() {
  if (typeof window !== "undefined" && window.AMLoader) {
    window.AMLoader.appMounted();
  }
}
