import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { SolutionsPage } from './pages/SolutionsPage'
import { IndustriesPage } from './pages/IndustriesPage'
import { HowWeWorkPage } from './pages/HowWeWorkPage'
import { AboutPage } from './pages/AboutPage'
import { CareersPage } from './pages/CareersPage'
import { ContactPage } from './pages/ContactPage'
import { MobilePreviewPage } from './pages/MobilePreviewPage'

function ScrollMotionController() {
  useEffect(() => {
    const scrollEndQuietPeriod = 250
    const hasNativeScrollEnd = 'onscrollend' in window
    let isScrolling = false
    let scrollEndTimer = null

    const endScroll = () => {
      if (!isScrolling) return

      isScrolling = false
      scrollEndTimer = null
      window.dispatchEvent(new Event('automatemind:scrollend'))
    }

    const scheduleScrollEnd = () => {
      clearTimeout(scrollEndTimer)
      scrollEndTimer = window.setTimeout(endScroll, scrollEndQuietPeriod)
    }

    const handleScroll = () => {
      if (scrollEndTimer !== null) {
        clearTimeout(scrollEndTimer)
        scrollEndTimer = null
      }

      if (!isScrolling) {
        isScrolling = true
        window.dispatchEvent(new Event('automatemind:scrollstart'))
      }

      if (!hasNativeScrollEnd) scheduleScrollEnd()
    }

    const handleScrollEnd = () => {
      if (isScrolling) scheduleScrollEnd()
    }

    const handleScrollInput = () => {
      if (isScrolling) scheduleScrollEnd()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    if (hasNativeScrollEnd) window.addEventListener('scrollend', handleScrollEnd, { passive: true })
    window.addEventListener('wheel', handleScrollInput, { passive: true })
    window.addEventListener('touchmove', handleScrollInput, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (hasNativeScrollEnd) window.removeEventListener('scrollend', handleScrollEnd)
      window.removeEventListener('wheel', handleScrollInput)
      window.removeEventListener('touchmove', handleScrollInput)
      clearTimeout(scrollEndTimer)
      endScroll()
    }
  }, [])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollMotionController />
      <div className="site-shell">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/how-we-work" element={<HowWeWorkPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/mobile-preview" element={<MobilePreviewPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
