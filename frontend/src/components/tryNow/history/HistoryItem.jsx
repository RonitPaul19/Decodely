import { useState } from "react"

export default function HistoryItem({ entry, isActive, onSelectEntry, onDeleteEntry }) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div
      className={`group relative rounded-xl p-3 transition duration-300 ${
        isActive ? "bg-zinc-800 text-white" : "bg-transparent text-zinc-300 hover:bg-zinc-800"
      }`}
    >
      <button
        type="button"
        onClick={() => {
          if (showConfirm) setShowConfirm(false)
          onSelectEntry(entry)
        }}
        aria-current={isActive ? "true" : undefined}
        className="w-full text-left"
      >
        <h3 className="truncate text-sm font-semibold text-white">
          {entry.title}
        </h3>
      </button>

      {showConfirm ? (
        <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <span className="text-[11px] font-medium text-zinc-400">Delete?</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteEntry(entry.id)
              setShowConfirm(false)
            }}
            className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[11px] font-semibold text-rose-400 transition hover:bg-rose-500/30"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setShowConfirm(false)
            }}
            className="rounded bg-zinc-800 px-1.5 py-0.5 text-[11px] font-semibold text-zinc-300 transition hover:bg-zinc-700"
          >
            No
          </button>
        </span>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setShowConfirm(true)
          }}
          aria-label={`Delete ${entry.title}`}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-500 opacity-0 transition hover:bg-zinc-700 hover:text-red-400 group-hover:opacity-100"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M3 5h14M8 5V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2M17 5l-1 12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L3 5" />
          </svg>
        </button>
      )}
    </div>
  )
}
