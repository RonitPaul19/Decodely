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
  onRequestClearHistory,
  onDeleteEntry,
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileOpen, setIsMobileOpen] = useState(false)
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
    if (typeof onRequestClearHistory === "function") onRequestClearHistory()
  }

  const handleSelectEntry = (entry) => {
    onSelectEntry(entry)
    setIsMobileOpen(false)
  }

  const sidebarContent = (
    <>
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
        <HistoryList entries={filteredEntries} activeEntryId={activeEntryId} onSelectEntry={handleSelectEntry} onDeleteEntry={onDeleteEntry} />
      ) : hasEntries ? (
        <HistoryEmptyState>No matching chats.</HistoryEmptyState>
      ) : (
        <HistoryEmptyState />
      )}
    </>
  )

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-white shadow-lg transition hover:bg-zinc-700"
        aria-label="Open history"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-zinc-950 border-r border-zinc-800 p-4 overflow-y-scroll shadow-xl">
            <div className="flex items-center justify-end mb-4">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="rounded-full p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                aria-label="Close history"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="history-pane border border-zinc-800 bg-zinc-950 p-4 hidden lg:block lg:fixed lg:left-0 lg:top-[73px] lg:bottom-0 lg:w-72 lg:overflow-y-scroll lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:shadow-none">
        {sidebarContent}
      </aside>
    </>
  )
}
