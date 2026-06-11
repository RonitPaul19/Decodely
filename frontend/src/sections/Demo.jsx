import CodeWindow from "../components/demo/CodeWindow"
import DemoHeading from "../components/demo/DemoHeading"
import ExplanationWindow from "../components/demo/ExplanationWindow"

export default function Demo() {
  return (
    <section className="px-6 py-32">

      <DemoHeading />

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
