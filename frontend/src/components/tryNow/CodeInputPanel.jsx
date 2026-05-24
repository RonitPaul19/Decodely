export default function CodeInputPanel() {
  return (
    <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Paste Your Code</h2>
          <p className="text-zinc-400 text-sm mt-1">Enter any JavaScript code snippet here for analysis.</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs">Code editor</span>
      </div>

      <textarea
        className="min-h-[480px] w-full resize-none rounded-[2rem] bg-black/60 border border-zinc-800 p-6 text-sm text-zinc-100 outline-none focus:border-white focus:ring-2 focus:ring-white/10"
        placeholder="Paste your code here..."
        spellCheck="false"
      />

      <button
        type="button"
        className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition duration-300"
      >
        Explain
      </button>
    </div>
  )
}
