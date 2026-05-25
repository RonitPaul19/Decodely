import CodeEditor from "./codeInput/CodeEditor"
import CodeInputHeader from "./codeInput/CodeInputHeader"
import ExplainButton from "./codeInput/ExplainButton"

export default function CodeInputPanel({ code, onCodeChange, onExplain, canExplain }) {
  return (
    <div className="h-full bg-zinc-900 rounded-3xl border border-zinc-800 p-5 sm:p-6 shadow-lg">
      <CodeInputHeader />
      <CodeEditor code={code} onCodeChange={onCodeChange} />
      <ExplainButton canExplain={canExplain} onExplain={onExplain} />
    </div>
  )
}
