import CodeWindow from "../components/demo/CodeWindow"
import ExplanationWindow from "../components/demo/ExplanationWindow"

export default function Demo() {
  return (
    <section className="px-6 py-32">

      {/* Heading */}
      <div className="text-center mb-20">

        <h1 className="text-5xl font-bold">
          See Decodely In Action
        </h1>

        <p className="text-zinc-400 mt-4 text-lg">
          Instantly understand what your code actually does.
        </p>

      </div>

      {/* Demo Layout */}
      <div
        className="
          max-w-7xl
          mx-auto

          grid
          grid-cols-1
          lg:grid-cols-2

          gap-10
        "
      >

        <CodeWindow />

        <ExplanationWindow />

      </div>

    </section>
  )
}
