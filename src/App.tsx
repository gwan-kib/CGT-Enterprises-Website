import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { ContactSection } from './components/sections/ContactSection'
import { FaqSection } from './components/sections/FaqSection'
import { HeroSection } from './components/sections/HeroSection'
import { ReviewFormSection } from './components/sections/ReviewFormSection'
import { ReviewsSection } from './components/sections/ReviewsSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { ToastRegion } from './components/ui/ToastRegion'

function App() {
  return (
    <>
      <Header />
      <ToastRegion />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <ReviewsSection />
        <ReviewFormSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
