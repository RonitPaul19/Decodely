import { useEffect, useState } from "react"
import CodeInputPanel from "./CodeInputPanel"
import ExplanationPanel from "./ExplanationPanel"
import HistorySection from "./HistorySection"

const HISTORY_STORAGE_KEY = "decodelyExplanationHistory"
const MAX_HISTORY_ITEMS = 8

export default function TryNow() {
  const [code, setCode] = useState("")
  const [history, setHistory] = useState(() => loadHistory())
  const [activeHistoryId, setActiveHistoryId] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
    } catch {
      // History is a local enhancement, so the page can keep working without it.
    }
  }, [history])

  const handleExplain = () => {
    if (!code.trim()) return
    // Output generation will be connected later.
  }

  const handleCodeChange = (nextCode) => {
    setCode(nextCode)

    if (!activeHistoryId) return

    setHistory((currentHistory) =>
      currentHistory.map((entry) =>
        entry.id === activeHistoryId
          ? {
              ...entry,
              title: createHistoryTitle(nextCode),
              code: nextCode,
            }
          : entry
      )
    )
  }

  const handleNewExplanation = () => {
    const activeEntry = history.find((entry) => entry.id === activeHistoryId)

    if (activeEntry && !activeEntry.code.trim()) {
      setCode("")
      return
    }

    const nextEntry = {
      id: createHistoryId(),
      title: createHistoryTitle(""),
      code: "",
      createdAt: new Date().toISOString(),
    }

    setCode("")
    setActiveHistoryId(nextEntry.id)
    setHistory((currentHistory) => [nextEntry, ...currentHistory].slice(0, MAX_HISTORY_ITEMS))
  }

  const handleSelectHistory = (entry) => {
    setCode(entry.code)
    setActiveHistoryId(entry.id)
  }

  const handleClearHistory = () => {
    setCode("")
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
            onNewExplanation={handleNewExplanation}
            onSelectEntry={handleSelectHistory}
            onClearHistory={handleClearHistory}
          />

          <div className="min-w-0 space-y-5">
            <CodeInputPanel
              code={code}
              onCodeChange={handleCodeChange}
              onExplain={handleExplain}
              canExplain={Boolean(code.trim())}
            />
            <ExplanationPanel />
          </div>
        </div>
      </section>
    </main>
  )
}

function loadHistory() {
  try {
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
  if (!entry || typeof entry !== "object") return null

  const code = typeof entry.code === "string" ? entry.code : ""

  return {
    id: typeof entry.id === "string" ? entry.id : createHistoryId(),
    title: typeof entry.title === "string" ? entry.title : createHistoryTitle(code),
    code,
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
  const firstLine = code.split("\n").find((line) => line.trim()) || "New explanation"
  const title = firstLine.trim()
  return title.length > 64 ? `${title.slice(0, 61)}...` : title
}
