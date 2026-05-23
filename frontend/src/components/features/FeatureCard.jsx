export default function FeatureCard({ title, description }) {
  return (
      <div
        className="
          bg-zinc-900
          border border-zinc-800
          rounded-3xl
          p-8

          transform-gpu
          origin-center

          hover:scale-105
          hover:border-zinc-700

          transition-all
          duration-300
          ease-out

          hover:shadow-2xl
          hover:shadow-white/5
        "
      >

      <h2 className="text-2xl font-semibold mb-4">
        {title}
      </h2>

      <p className="text-zinc-400 leading-relaxed">
        {description}
      </p>

    </div>
  )
}
