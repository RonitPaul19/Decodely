export default function CodeEditor({ code, onCodeChange }) {
  return (
    <textarea
      className="min-h-65 sm:min-h-75 lg:min-h-70 w-full resize-none rounded-2xl bg-black/60 border border-zinc-800 p-4 text-sm text-zinc-100 outline-none focus:border-white focus:ring-2 focus:ring-white/10"
      placeholder="Paste your code here..."
      spellCheck="false"
      value={code}
      onChange={(event) => onCodeChange(event.target.value)}
    />
  )
}
