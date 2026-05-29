import ReactMarkdown from "react-markdown"

export default function ExplanationOutput({ explanation, isLoading, error }) {
  return (
    <div className="flex-1 rounded-2xl bg-black/60 border border-dashed border-zinc-800 p-4 text-zinc-300 overflow-y-auto min-h-[240px] sm:min-h-[280px] lg:min-h-[260px]">
      {isLoading && (
        <div className="flex items-center gap-3 text-zinc-400">
          <span className="inline-block w-4 h-4 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
          <span className="text-sm">Analysing your code...</span>
        </div>
      )}

      {error && !isLoading && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {explanation && !isLoading && (
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-xl font-bold text-white mt-4 mb-2">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-base font-semibold text-zinc-100 mt-3 mb-1">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-sm leading-relaxed text-zinc-300 mb-3">{children}</p>
            ),
            code: ({ inline, children }) =>
              inline ? (
                <code className="bg-zinc-800 text-green-400 px-1.5 py-0.5 rounded text-xs font-mono">
                  {children}
                </code>
              ) : (
                <pre className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 overflow-x-auto my-3">
                  <code className="text-green-400 text-xs font-mono whitespace-pre">
                    {children}
                  </code>
                </pre>
              ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1 mb-3 ml-2">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-sm text-zinc-300 space-y-1 mb-3 ml-2">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-sm text-zinc-300">{children}</li>
            ),
            strong: ({ children }) => (
              <strong className="text-white font-semibold">{children}</strong>
            ),
          }}
        >
          {explanation}
        </ReactMarkdown>
      )}

      {!explanation && !isLoading && !error && (
        <p className="text-zinc-500">Explanation content will appear here once you hit Explain.</p>
      )}
    </div>
  )
}
