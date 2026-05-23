import PricingBadge from "./PricingBadge"
import PricingButton from "./PricingButton"
import PricingFeatures from "./PricingFeatures"
import PricingHeader from "./PricingHeader"

export default function PricingCard({
  title,
  price,
  duration,
  features,
  popular,
}) {
  return (
    <div
      className={`
        relative
        rounded-3xl
        p-8

        border

        transition-all
        duration-300

        hover:-translate-y-1

        ${
          popular
            ? `
              bg-zinc-800
              text-white
              border-violet-500/40
              shadow-2xl
              shadow-violet-500/10
            `
            : `
              bg-zinc-900
              text-white
              border-zinc-800
              hover:border-zinc-700
            `
        }
      `}
    >

      {popular && <PricingBadge />}

      <PricingHeader
        title={title}
        price={price}
        duration={duration}
      />

      <PricingFeatures
        features={features}
      />

      <PricingButton
        popular={popular}
      />

    </div>
  )
}
