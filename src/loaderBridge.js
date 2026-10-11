export function signalAppReady() {
  if (typeof window !== 'undefined' && window.AMLoader) {
    window.AMLoader.appMounted()
  }
}
