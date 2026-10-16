import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react';
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
import VoiceAgent from './VoiceAgent'; // 👈 1. Import the component


function App() {

  return (
    <BrowserRouter>
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
        
        <VoiceAgent />
        
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
