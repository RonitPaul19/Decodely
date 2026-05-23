import featuresData from "../../data/featuresData"
import FeatureCard from "./FeatureCard"

export default function Features() {
  return (
    <section className="px-6 py-24">

      {/* Section Heading */}
      <div className="text-center mb-16">

        <h1 className="text-5xl font-bold">
          Powerful Features
        </h1>

        <p className="text-zinc-400 mt-4 text-lg">
          Everything you need to truly understand programming.
        </p>

      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {featuresData.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
          />
        ))}

      </div>

    </section>
  )
}
