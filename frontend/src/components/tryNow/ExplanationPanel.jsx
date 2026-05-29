import ExplanationHeader from "./explanation/ExplanationHeader"
import ExplanationOutput from "./explanation/ExplanationOutput"

export default function ExplanationPanel({ explanation, isLoading, error }) {
  return (
    <div className="h-full bg-zinc-900 rounded-3xl border border-zinc-800 p-5 sm:p-6 shadow-lg flex flex-col">
      <ExplanationHeader />
      <ExplanationOutput
        explanation={explanation}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
