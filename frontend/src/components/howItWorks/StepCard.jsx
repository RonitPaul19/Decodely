export default function StepCard({
  step,
  title,
  description,
}) {
  return (
      <div
        className="
          bg-zinc-900
          border border-zinc-800
          rounded-3xl
          p-8
          text-center

          hover:border-zinc-700

          transition-colors
          duration-300
        "
      >

      <h1 className="text-6xl font-bold text-zinc-700 mb-6">
        {step}
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        {title}
      </h2>

      <p className="text-zinc-400 leading-relaxed">
        {description}
      </p>

    </div>
  )
}
