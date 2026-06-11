import HowItWorksHeading from "../components/howItWorks/HowItWorksHeading"
import StepCard from "../components/howItWorks/StepCard"
import howItWorksData from "../data/howItWorksData"

// 'How It Works' section explaining the learning flow. `id="howitworks"`
// enables anchor navigation from the header.
export default function HowItWorks() {
  return (
    <section id="howitworks" className="px-6 py-28">

      <HowItWorksHeading />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">

        {howItWorksData.map((item) => (
          <StepCard
            key={item.id}
            step={item.step}
            title={item.title}
            description={item.description}
          />
        ))}

      </div>

    </section>
  )
}
