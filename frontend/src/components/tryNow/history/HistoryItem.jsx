export default function HistoryItem({ entry, isActive, onSelectEntry }) {
  return (
    <button
      type="button"
      onClick={() => onSelectEntry(entry)}
      aria-current={isActive ? "true" : undefined}
      className={`text-left rounded-xl p-3 transition duration-300 ${
        isActive ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-900"
      }`}
    >
      <h3 className="min-w-0 overflow-hidden text-sm font-semibold text-white break-words line-clamp-2">
        {entry.title}
      </h3>
    </button>
  )
}
