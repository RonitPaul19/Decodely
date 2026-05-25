export default function ClearHistoryButton({ hasEntries, onClearHistory }) {
  return (
    <button
      type="button"
      onClick={onClearHistory}
      disabled={!hasEntries}
      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition duration-300 ${
        hasEntries
          ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
          : "bg-zinc-900 text-zinc-600 cursor-not-allowed"
      }`}
    >
      Clear History
    </button>
  )
}
