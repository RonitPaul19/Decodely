import { useRef } from "react"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-css"
import "prismjs/themes/prism-tomorrow.css"

const languageMap = {
  javascript: "javascript",
  js: "javascript",
  python: "python",
  py: "python",
  java: "java",
  bash: "bash",
  sh: "bash",
  css: "css",
}

export default function CodeEditor({ code, onCodeChange, selectedLanguage = "auto" }) {
  const preRef = useRef(null)
  const lang = languageMap[selectedLanguage] || "javascript"

  const highlighted = () => {
    try {
      return Prism.highlight(code || "", Prism.languages[lang] || Prism.languages.javascript, lang)
    } catch (e) {
      return (code || "")
    }
  }

  return (
    <div className="relative min-h-65 sm:min-h-75 lg:min-h-70 w-full rounded-2xl bg-black/60 border border-zinc-800 p-0 text-sm text-zinc-100 font-mono">
      <pre
        aria-hidden="true"
        ref={preRef}
        className="m-0 p-4 overflow-auto whitespace-pre-wrap rounded-2xl text-sm leading-5 pointer-events-none"
        dangerouslySetInnerHTML={{ __html: highlighted() }}
      />

      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        spellCheck="false"
        placeholder="Paste your code here..."
        className="absolute inset-0 w-full h-full resize-none rounded-2xl bg-transparent p-4 text-sm text-transparent caret-white outline-none"
        style={{ WebkitTextFillColor: "transparent" }}
      />
    </div>
  )
}
