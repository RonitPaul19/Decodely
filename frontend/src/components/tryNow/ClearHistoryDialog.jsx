export default function ClearHistoryDialog({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
      <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
        <h3 className="text-base font-semibold">Clear history?</h3>
        <p className="mt-3 text-sm text-zinc-400">
          This will remove all saved chats from this device. This action cannot be undone.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-zinc-700 bg-transparent px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-transparent px-4 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/10 hover:text-rose-200"
          >
            Clear History
          </button>
        </div>
      </div>
    </div>
  )
}
