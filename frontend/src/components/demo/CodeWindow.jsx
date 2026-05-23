export default function CodeWindow() {
  return (
    <div
      className="
        bg-zinc-900
        border border-zinc-800
        rounded-3xl
        overflow-hidden
      "
    >
      {/* Top Bar */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-zinc-800">
        <div className="w-3 h-3 rounded-full bg-red-500" />

        <div className="w-3 h-3 rounded-full bg-yellow-500" />

        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      {/* Code */}
      <pre className="p-6 text-sm overflow-x-auto leading-8">
        <code>
          <span className="text-blue-400">for</span>

          <span className="text-white">(</span>

          <span className="text-blue-400">int</span>

          <span className="text-white"> i </span>

          <span className="text-pink-400">=</span>

          <span className="text-orange-400"> 0</span>

          <span className="text-white">; i </span>

          <span className="text-pink-400">&lt;</span>

          <span className="text-white"> n; i</span>

          <span className="text-pink-400">++</span>

          <span className="text-white">) {"{"}</span>

          <br />

          <span className="ml-6 text-white">sum</span>

          <span className="text-pink-400"> += </span>

          <span className="text-white">arr[i];</span>

          <br />

          <span className="text-white">{"}"}</span>
        </code>
      </pre>
    </div>
  );
}
