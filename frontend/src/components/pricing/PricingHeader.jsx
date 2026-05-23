export default function PricingHeader({
  title,
  price,
  duration,
}) {
  return (
    <>
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6">
        {title}
      </h2>

      {/* Price */}
      <div className="flex items-end gap-2 mb-8">

        <span className="text-5xl font-bold">
          {price}
        </span>

        <span className="mb-1 text-zinc-400">
          {duration}
        </span>

      </div>
    </>
  )
}
