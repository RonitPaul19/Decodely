import HistoryItem from "./HistoryItem"

export default function HistoryList({ entries, activeEntryId, onSelectEntry, onDeleteEntry }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
      {entries.map((entry) => (
        <HistoryItem
          key={entry.id}
          entry={entry}
          isActive={entry.id === activeEntryId}
          onSelectEntry={onSelectEntry}
          onDeleteEntry={onDeleteEntry}
        />
      ))}
    </div>
  )
}
