import { useEffect, useState } from "react"
import CodeInputPanel from "./CodeInputPanel"
import ExplanationPanel from "./ExplanationPanel"
import HistorySection from "./HistorySection"

const HISTORY_STORAGE_KEY = "decodelyExplanationHistory"
const MAX_HISTORY_ITEMS = 8

export default function TryNow() {
  // Keep the Try Now workspace state in one place so the panels stay in sync.
  const [code, setCode] = useState("")
  const [explanation, setExplanation] = useState("")
  const [history, setHistory] = useState(() => loadHistory())
  const [activeHistoryId, setActiveHistoryId] = useState(null)

  // Persist history locally until a backend is connected.
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
    } catch {
      // History is a local enhancement, so the page can keep working without it.
    }
  }, [history])

  const handleExplain = () => {
    const trimmedCode = code.trim()
    if (!trimmedCode) return

    // Temporary frontend-only explanation used to power the UI before real AI output exists.
    const nextExplanation = createPreviewExplanation(trimmedCode)
    const nextEntry = {
      id: createHistoryId(),
      title: createHistoryTitle(trimmedCode),
      code: trimmedCode,
      explanation: nextExplanation,
      createdAt: new Date().toISOString(),
    }

    setExplanation(nextExplanation)
    setActiveHistoryId(nextEntry.id)
    // Add the newest explanation first and keep the sidebar from growing forever.
    setHistory((currentHistory) => [nextEntry, ...currentHistory].slice(0, MAX_HISTORY_ITEMS))
  }

  const handleSelectHistory = (entry) => {
    setCode(entry.code)
    setExplanation(entry.explanation)
    setActiveHistoryId(entry.id)
  }

  const handleClearHistory = () => {
    setHistory([])
    setActiveHistoryId(null)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-[1440px] mx-auto">
        <div className="space-y-5 lg:space-y-0 lg:pl-72">
          <HistorySection
            entries={history}
            activeEntryId={activeHistoryId}
            onSelectEntry={handleSelectHistory}
            onClearHistory={handleClearHistory}
          />

          <div className="min-w-0 space-y-5">
            <CodeInputPanel
              code={code}
              onCodeChange={setCode}
              onExplain={handleExplain}
              canExplain={Boolean(code.trim())}
            />
            <ExplanationPanel explanation={explanation} />
          </div>
        </div>
      </section>
    </main>
  )
}

function loadHistory() {
  try {
    // localStorage can contain stale or manually edited data, so validate before rendering.
    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY)
    if (!storedHistory) return []

    const parsedHistory = JSON.parse(storedHistory)
    if (!Array.isArray(parsedHistory)) return []

    return parsedHistory
      .map(normalizeHistoryEntry)
      .filter(Boolean)
      .slice(0, MAX_HISTORY_ITEMS)
  } catch {
    return []
  }
}

function normalizeHistoryEntry(entry) {
  // Drop malformed entries instead of letting old browser data break the page.
  if (!entry || typeof entry !== "object") return null

  const code = typeof entry.code === "string" ? entry.code : ""
  const explanation = typeof entry.explanation === "string" ? entry.explanation : ""
  if (!code || !explanation) return null

  return {
    id: typeof entry.id === "string" ? entry.id : createHistoryId(),
    title: typeof entry.title === "string" ? entry.title : createHistoryTitle(code),
    code,
    explanation,
    createdAt: isValidDate(entry.createdAt) ? entry.createdAt : new Date().toISOString(),
  }
}

function isValidDate(date) {
  return Boolean(date) && !Number.isNaN(new Date(date).getTime())
}

function createHistoryId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function createHistoryTitle(code) {
  const firstLine = code.split("\n").find((line) => line.trim()) || "Code snippet"
  const title = firstLine.trim()
  return title.length > 64 ? `${title.slice(0, 61)}...` : title
}

function createPreviewExplanation(code) {
  // Small heuristic summary until this screen is connected to the backend/AI service.
  const nonEmptyLineCount = code.split("\n").filter((line) => line.trim()).length
  const details = []

  if (/\bfunction\b|=>/.test(code)) details.push("defines reusable logic")
  if (/console\.log/.test(code)) details.push("prints values to the console")
  if (/\bfor\b|\bwhile\b|\.map\(|\.forEach\(/.test(code)) details.push("loops through data")
  if (/\bif\b|\?/.test(code)) details.push("uses conditional logic")
  if (/fetch\(|axios/.test(code)) details.push("appears to request data")
  if (/useState|useEffect/.test(code)) details.push("uses React state or effects")

  const lineLabel = nonEmptyLineCount === 1 ? "line" : "lines"
  const summary = details.length
    ? `This snippet ${details.join(", ")}.`
    : "This snippet is saved and ready for a full explanation."

  return `${summary} It contains ${nonEmptyLineCount} non-empty ${lineLabel}.`
}
