import CodeInputPanel from "./CodeInputPanel"
import ExplanationPanel from "./ExplanationPanel"

export default function TryNow() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <CodeInputPanel />
          <ExplanationPanel />
        </div>
      </section>
    </main>
  )
}
