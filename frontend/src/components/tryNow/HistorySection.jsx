import { useMemo, useState } from "react"
import HistoryEmptyState from "./history/HistoryEmptyState"
import HistoryHeader from "./history/HistoryHeader"
import HistoryList from "./history/HistoryList"

export default function HistorySection({
  entries,
  activeEntryId,
  onNewExplanation,
  onSelectEntry,
  onClearHistory,
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showClearDialog, setShowClearDialog] = useState(false)
  const hasEntries = entries.length > 0
  const normalizedSearchQuery = searchQuery.trim().toLowerCase()
  const filteredEntries = useMemo(() => {
    if (!normalizedSearchQuery) return entries

    return entries.filter((entry) =>
      `${entry.title} ${entry.code}`.toLowerCase().includes(normalizedSearchQuery)
    )
  }, [entries, normalizedSearchQuery])

  const handleToggleSearch = () => {
    setIsSearchOpen((currentValue) => !currentValue)
    if (isSearchOpen) setSearchQuery("")
  }

  const handleNewExplanation = () => {
    setSearchQuery("")
    onNewExplanation()
  }

  const handleRequestClearHistory = () => {
    if (!hasEntries) return
    setShowClearDialog(true)
  }

  const handleConfirmClearHistory = () => {
    setShowClearDialog(false)
    setSearchQuery("")
    onClearHistory()
  }

  const handleCancelClearHistory = () => {
    setShowClearDialog(false)
  }

  return (
    /* Desktop history behaves like an app sidebar: fixed, edge-aligned, and independently scrollable. */
    <aside className="history-pane border border-zinc-800 bg-zinc-950 p-4 lg:fixed lg:left-0 lg:top-[73px] lg:bottom-0 lg:w-72 lg:overflow-y-scroll lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:shadow-none">
      <HistoryHeader
        hasEntries={hasEntries}
        isSearchOpen={isSearchOpen}
        onNewExplanation={handleNewExplanation}
        onToggleSearch={handleToggleSearch}
        onRequestClearHistory={handleRequestClearHistory}
      />

      {isSearchOpen && (
        <input
          type="search"
          aria-label="Search chat history"
          autoFocus
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search chats..."
          className="mb-4 w-full rounded-xl border border-zinc-800 bg-black/50 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-500"
        />
      )}

      {hasEntries && filteredEntries.length > 0 ? (
        <HistoryList entries={filteredEntries} activeEntryId={activeEntryId} onSelectEntry={onSelectEntry} />
      ) : hasEntries ? (
        <HistoryEmptyState>No matching chats.</HistoryEmptyState>
      ) : (
        <HistoryEmptyState />
      )}

      {showClearDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
          <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
            <h3 className="text-base font-semibold">Clear history?</h3>
            <p className="mt-3 text-sm text-zinc-400">
              This will remove all saved chats from this device. This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancelClearHistory}
                className="rounded-full border border-zinc-700 bg-transparent px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClearHistory}
                className="rounded-full bg-transparent px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/10 hover:text-rose-200"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
