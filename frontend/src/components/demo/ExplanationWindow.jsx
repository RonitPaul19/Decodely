export default function ExplanationWindow() {
  return (
    <div
      className="
        bg-zinc-900
        border border-zinc-800
        rounded-3xl
        p-8
      "
    >
      <h2 className="text-2xl font-semibold mb-6">AI Explanation</h2>

      <div className="space-y-5 text-zinc-300 leading-relaxed">
        <p>This loop iterates through the array from index 0 to n-1.</p>

        <p>
          During each iteration, the current element is added to the variable{" "}
          <span className="text-white font-medium">sum</span>.
        </p>

        <p>
          Time Complexity: <span className="text-white font-bold">O(n)</span>
        </p>
      </div>
    </div>
  );
}
