export default function HistoryItem({ entry, isActive, onSelectEntry }) {
  return (
    <button
      type="button"
      onClick={() => onSelectEntry(entry)}
      aria-current={isActive ? "true" : undefined}
      className={`text-left rounded-xl p-3 transition duration-300 ${
        isActive ? "bg-zinc-800 text-white" : "bg-transparent text-zinc-300 hover:bg-zinc-800"
      }`}
    >
      <h3 className="truncate text-sm font-semibold text-white">
        {entry.title}
      </h3>
    </button>
  )
}
