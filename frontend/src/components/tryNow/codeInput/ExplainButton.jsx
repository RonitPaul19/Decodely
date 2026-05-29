export default function ExplainButton({ canExplain, onExplain }) {
  return (
    <button
      type="button"
      onClick={onExplain}
      disabled={!canExplain}
      className={`mt-4 px-5 py-2.5 rounded-full font-semibold transition duration-300 ${
        canExplain
          ? "bg-white text-black hover:scale-105"
          : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
      }`}
    >
      {canExplain ? "Explain" : "Explain"}
    </button>
  )
}
