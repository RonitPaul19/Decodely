import Editor from "react-simple-code-editor"
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
  const lang = languageMap[selectedLanguage] || "javascript"

  const highlight = (codeStr) => {
    try {
      return Prism.highlight(codeStr, Prism.languages[lang] || Prism.languages.javascript, lang)
    } catch (e) {
      return codeStr
    }
  }

  return (
    <div className="min-h-65 sm:min-h-75 lg:min-h-70 w-full rounded-2xl bg-black/60 border border-zinc-800 p-0 text-sm text-zinc-100">
      <Editor
        value={code}
        onValueChange={(val) => onCodeChange(val)}
        highlight={highlight}
        padding={16}
        textareaId="code-area"
        className="w-full textarea-code outline-none bg-transparent font-mono"
        preClassName="whitespace-pre-wrap"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace' }}
      />
    </div>
  )
}
