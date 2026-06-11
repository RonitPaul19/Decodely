import PricingCard from "../components/pricing/PricingCard"
import PricingHeading from "../components/pricing/PricingHeading"
import pricingData from "../data/pricingData"

// Pricing section with plans. `id="pricing"` allows direct linking from nav.
export default function Pricing() {
  return (
    <section id="pricing" className="px-6 py-32">

      <PricingHeading />

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
