import ClearHistoryButton from "./ClearHistoryButton"

export default function HistoryHeader({ hasEntries, onClearHistory }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div>
        <h2 className="text-base font-semibold">History</h2>
        <p className="text-zinc-400 text-sm mt-1">Saved on this device.</p>
      </div>

      <ClearHistoryButton hasEntries={hasEntries} onClearHistory={onClearHistory} />
    </div>
  )
}
