export default function CodeInputHeader() {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <h2 className="text-xl font-semibold">Paste Your Code</h2>
        <p className="text-zinc-400 text-sm mt-1">Enter any JavaScript code snippet here for analysis.</p>
      </div>
      <span className="shrink-0 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs">Code editor</span>
    </div>
  )
}
