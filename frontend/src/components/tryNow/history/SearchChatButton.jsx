export default function SearchChatButton({ hasEntries, isSearchOpen, onToggleSearch }) {
  return (
    <button
      type="button"
      onClick={onToggleSearch}
      disabled={!hasEntries}
      aria-pressed={isSearchOpen}
      className={`flex w-full items-center justify-start gap-2 rounded-full px-3 py-2 text-left text-xs font-semibold transition duration-300 ${
        hasEntries
          ? isSearchOpen
            ? "bg-transparent text-white hover:bg-zinc-800"
            : "bg-transparent text-zinc-200 hover:bg-zinc-800 hover:text-white"
          : "bg-zinc-900 text-zinc-600 cursor-not-allowed"
      }`}
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-zinc-400">
        <circle cx="8.5" cy="8.5" r="5.5" />
        <path d="M13.5 13.5L18 18" />
      </svg>
      <span>Search Explanation</span>
    </button>
  )
}
