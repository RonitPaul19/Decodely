import CodeEditor from "./codeInput/CodeEditor"
import CodeInputHeader from "./codeInput/CodeInputHeader"
import ExplainButton from "./codeInput/ExplainButton"

export default function CodeInputPanel({
  code,
  selectedLanguage,
  detectedLanguage,
  languageOptions,
  languageLabels,
  onLanguageChange,
  onCodeChange,
  onExplain,
  canExplain,
}) {
  return (
    <div className="h-full bg-zinc-900 rounded-3xl border border-zinc-800 p-5 sm:p-6 shadow-lg">
      <CodeInputHeader
        selectedLanguage={selectedLanguage}
        detectedLanguage={detectedLanguage}
        languageOptions={languageOptions}
        languageLabels={languageLabels}
        onLanguageChange={onLanguageChange}
      />
      <CodeEditor code={code} onCodeChange={onCodeChange} />
      <ExplainButton canExplain={canExplain} onExplain={onExplain} />
    </div>
  )
}
