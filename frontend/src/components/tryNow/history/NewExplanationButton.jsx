export default function NewExplanationButton({ onNewExplanation }) {
  return (
    <button
      type="button"
      onClick={onNewExplanation}
      className="flex w-full items-center justify-start gap-2 rounded-full bg-transparent px-3 py-2 text-left text-xs font-semibold text-zinc-200 transition duration-300 hover:bg-zinc-800 hover:text-white"
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-zinc-400">
        <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h11A1.5 1.5 0 0 1 17 6.5v5A1.5 1.5 0 0 1 15.5 13H7l-4 4V6.5z" />
        <path d="M10 8.5v3m1.5-1.5H8.5" />
      </svg>
      <span>New Explanation</span>
    </button>
  )
}
