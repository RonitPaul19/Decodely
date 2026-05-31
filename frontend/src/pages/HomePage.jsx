// Home page composed of several sections. Each section exposes an `id`
// so that anchor links (e.g. /#features) can scroll to them directly.
import Hero from "../sections/Hero"
import Features from "../sections/Features"
import HowItWorks from "../sections/HowItWorks"
import Demo from "../sections/Demo"
import Pricing from "../sections/Pricing"
import Footer from "../sections/Footer"

export default function HomePage() {
  return (
    <>
      {/* Hero / introduction */}
      <Hero />

      {/* Features list with id="features" */}
      <Features />

      {/* How it works steps with id="howitworks" */}
      <HowItWorks />

      {/* Demo section */}
      <Demo />

      {/* Pricing plans with id="pricing" */}
      <Pricing />

      {/* Footer contains about section with id="about" */}
      <Footer />
    </>
  )
}
