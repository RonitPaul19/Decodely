import ClearHistoryButton from "./ClearHistoryButton"
import NewExplanationButton from "./NewExplanationButton"
import SearchChatButton from "./SearchChatButton"

export default function HistoryHeader({
  hasEntries,
  isSearchOpen,
  onNewExplanation,
  onToggleSearch,
  onRequestClearHistory,
}) {
  return (
    <div className="mb-5">
      <div>
        <h2 className="text-base font-semibold">History</h2>
        <p className="text-zinc-400 text-sm mt-1">Saved on this device.</p>
      </div>

      <div className="grid gap-2 mt-4">
        <ClearHistoryButton hasEntries={hasEntries} onRequestClearHistory={onRequestClearHistory} />
        <NewExplanationButton onNewExplanation={onNewExplanation} />
        <SearchChatButton
          hasEntries={hasEntries}
          isSearchOpen={isSearchOpen}
          onToggleSearch={onToggleSearch}
        />
      </div>
    </div>
  )
}
