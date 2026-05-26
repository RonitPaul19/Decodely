export default function HistoryEmptyState({ children = "No explanations yet." }) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-800 p-4 text-sm text-zinc-500">
      {children}
    </div>
  )
}
