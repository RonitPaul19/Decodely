import StepCard from "../components/howItWorks/StepCard"
import howItWorksData from "../data/howItWorksData"

// 'How It Works' section explaining the learning flow. `id="howitworks"`
// enables anchor navigation from the header.
export default function HowItWorks() {
  return (
    <section id="howitworks" className="px-6 py-28">

      {/* Heading */}
      <div className="text-center mb-20">

        <h1 className="text-5xl font-bold">
          How It Works
        </h1>

        <p className="text-zinc-400 mt-4 text-lg">
          Understand code in three simple steps.
        </p>

      </div>

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
