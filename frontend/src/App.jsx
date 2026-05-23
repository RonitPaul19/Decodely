import Navbar from "./components/navbar/Navbar"
import Hero from "./components/hero/Hero"
import Features from "./components/features/Features"
import HowItWorks from "./components/howItWorks/HowItWorks"
import Demo from "./components/demo/Demo"
import Pricing from "./components/pricing/Pricing"
import Footer from "./components/footer/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Demo />
      <Pricing />
      <Footer />
    </div>
  )
}
