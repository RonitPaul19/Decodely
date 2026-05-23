export default function PricingFeatures({
  features,
}) {
  return (
    <div className="space-y-4 mb-10">

      {features.map((feature, index) => (
        <p
          key={index}
          className="text-zinc-300"
        >
          • {feature}
        </p>
      ))}

    </div>
  )
}
