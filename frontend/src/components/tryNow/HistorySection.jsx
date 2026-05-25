import HistoryEmptyState from "./history/HistoryEmptyState"
import HistoryHeader from "./history/HistoryHeader"
import HistoryList from "./history/HistoryList"

export default function HistorySection({ entries, activeEntryId, onSelectEntry, onClearHistory }) {
  const hasEntries = entries.length > 0

  return (
    /* Desktop history behaves like an app sidebar: fixed, edge-aligned, and independently scrollable. */
    <aside className="history-pane border border-zinc-800 bg-zinc-950 p-4 lg:fixed lg:left-0 lg:top-[73px] lg:bottom-0 lg:w-72 lg:overflow-y-scroll lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:shadow-none">
      <HistoryHeader hasEntries={hasEntries} onClearHistory={onClearHistory} />

      {hasEntries ? (
        <HistoryList entries={entries} activeEntryId={activeEntryId} onSelectEntry={onSelectEntry} />
      ) : (
        <HistoryEmptyState />
      )}
    </aside>
  )
}
