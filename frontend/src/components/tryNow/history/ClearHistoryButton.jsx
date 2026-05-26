export default function ClearHistoryButton({ hasEntries, onRequestClearHistory }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!hasEntries) return
        onRequestClearHistory()
      }}
      disabled={!hasEntries}
      className={`flex w-full items-center justify-start gap-2 text-left px-3 py-2 rounded-full text-xs font-semibold transition duration-300 ${
        hasEntries
          ? "bg-transparent text-zinc-200 hover:bg-zinc-800"
          : "bg-zinc-900 text-zinc-600 cursor-not-allowed"
      }`}
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-zinc-400">
        <path d="M6 7h8" />
        <path d="M7 7v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7" />
        <path d="M9 7V5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v2" />
      </svg>
      <span>Clear History</span>
    </button>
  )
}
