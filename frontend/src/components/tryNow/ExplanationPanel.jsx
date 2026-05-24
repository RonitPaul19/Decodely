export default function ExplanationPanel() {
  return (
    <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 shadow-xl flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">AI Explanation</h2>
        <p className="text-zinc-400 text-sm mt-1">
          The explanation output will appear in this panel after you click Explain.
        </p>
      </div>

      <div className="flex-1 rounded-[2rem] bg-black/60 border border-dashed border-zinc-800 p-6 text-zinc-300 overflow-y-auto min-h-[420px]">
        <p className="text-zinc-500">Explanation content will appear here once the feature is connected.</p>
      </div>
    </div>
  )
}
