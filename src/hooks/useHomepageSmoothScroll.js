import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export function useHomepageSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
      prevent: (node) => Boolean(node.closest?.('#mobile-menu, .mobile-menu-backdrop')),
    })

    return () => {
      lenis.destroy()
    }
  }, [])
}
