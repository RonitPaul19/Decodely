import pricingData from "../data/pricingData"
import PricingCard from "../components/pricing/PricingCard"

// Pricing section with plans. `id="pricing"` allows direct linking from nav.
export default function Pricing() {
  return (
    <section id="pricing" className="px-6 py-32">

      {/* Heading */}
      <div className="text-center mb-20">

        <h1 className="text-5xl font-bold">
          Simple Pricing
        </h1>

        <p className="text-zinc-400 mt-4 text-lg">
          Choose the perfect plan for your learning journey.
        </p>

      </div>

      {/* Pricing Cards */}
      <div
        className="
          max-w-7xl
          mx-auto

          grid
          grid-cols-1
          md:grid-cols-3

          gap-10
        "
      >

        {pricingData.map((plan) => (
          <PricingCard
            key={plan.id}
            title={plan.title}
            price={plan.price}
            duration={plan.duration}
            features={plan.features}
            popular={plan.popular}
          />
        ))}

      </div>

    </section>
  )
}
