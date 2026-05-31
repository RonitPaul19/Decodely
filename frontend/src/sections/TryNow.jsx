import { useEffect, useState } from "react"
import CodeInputPanel from "../components/tryNow/CodeInputPanel"
import ExplanationPanel from "../components/tryNow/ExplanationPanel"
import HistorySection from "../components/tryNow/HistorySection"

const HISTORY_STORAGE_KEY = "decodelyExplanationHistory"
const MAX_HISTORY_ITEMS = 8
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export default function TryNow() {
  const [code, setCode] = useState("")
  const [history, setHistory] = useState(() => loadHistory())
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const [explanation, setExplanation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
    } catch {
      // History is a local enhancement, so the page can keep working without it.
    }
  }, [history])

  const handleExplain = async () => {
    if (!code.trim()) return

    setIsLoading(true)
    setError("")
    setExplanation("")

    try {
      const response = await fetch(`${API_URL}/api/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "Request failed.")
      }

      setExplanation(data.explanation)

      if (activeHistoryId) {
        setHistory((currentHistory) =>
          currentHistory.map((entry) =>
            entry.id === activeHistoryId
              ? { ...entry, explanation: data.explanation }
              : entry
          )
        )
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeChange = (nextCode) => {
    setCode(nextCode)

    if (!activeHistoryId) return

    setHistory((currentHistory) =>
      currentHistory.map((entry) =>
        entry.id === activeHistoryId
          ? { ...entry, title: createHistoryTitle(nextCode), code: nextCode }
          : entry
      )
    )
  }

  const handleNewExplanation = () => {
    const activeEntry = history.find((entry) => entry.id === activeHistoryId)

    if (activeEntry && !activeEntry.code.trim()) {
      setCode("")
      setExplanation("")
      setError("")
      return
    }

    const nextEntry = {
      id: createHistoryId(),
      title: createHistoryTitle(""),
      code: "",
      explanation: "",
      createdAt: new Date().toISOString(),
    }

    setCode("")
    setExplanation("")
    setError("")
    setActiveHistoryId(nextEntry.id)
    setHistory((currentHistory) => [nextEntry, ...currentHistory].slice(0, MAX_HISTORY_ITEMS))
  }

  const handleSelectHistory = (entry) => {
    setCode(entry.code)
    setExplanation(entry.explanation || "")
    setError("")
    setActiveHistoryId(entry.id)
  }

  const handleClearHistory = () => {
    setCode("")
    setExplanation("")
    setError("")
    setHistory([])
    setActiveHistoryId(null)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-360 mx-auto">
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
              canExplain={Boolean(code.trim()) && !isLoading}
            />
            <ExplanationPanel
              explanation={explanation}
              isLoading={isLoading}
              error={error}
            />
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
    return parsedHistory.map(normalizeHistoryEntry).filter(Boolean).slice(0, MAX_HISTORY_ITEMS)
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
    explanation: typeof entry.explanation === "string" ? entry.explanation : "",
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
