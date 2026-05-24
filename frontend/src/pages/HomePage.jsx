// Home page composed of several sections. Each section exposes an `id`
// so that anchor links (e.g. /#features) can scroll to them directly.
import Hero from "../components/hero/Hero"
import Features from "../components/features/Features"
import HowItWorks from "../components/howItWorks/HowItWorks"
import Demo from "../components/demo/Demo"
import Pricing from "../components/pricing/Pricing"
import Footer from "../components/footer/Footer"

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
