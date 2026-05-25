export default function CodeEditor({ code, onCodeChange }) {
  return (
    <textarea
      className="min-h-[260px] sm:min-h-[300px] lg:min-h-[280px] w-full resize-none rounded-2xl bg-black/60 border border-zinc-800 p-4 text-sm text-zinc-100 outline-none focus:border-white focus:ring-2 focus:ring-white/10"
      placeholder="Paste your code here..."
      spellCheck="false"
      value={code}
      onChange={(event) => onCodeChange(event.target.value)}
    />
  )
}
