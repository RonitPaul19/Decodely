import { useEffect, useState } from "react"
import CodeInputPanel from "./CodeInputPanel"
import ExplanationPanel from "./ExplanationPanel"
import HistorySection from "./HistorySection"
import ClearHistoryDialog from "./ClearHistoryDialog"
import { AUTO_LANGUAGE, LANGUAGE_LABELS, LANGUAGE_OPTIONS } from "../../data/languageData"
import {
  loadHistory,
  createHistoryId,
  createHistoryTitle,
  detectLanguage,
  HISTORY_STORAGE_KEY,
  MAX_HISTORY_ITEMS,
} from "./historyUtils"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export default function TryNowPanel() {
  const [code, setCode] = useState("")
  const [history, setHistory] = useState(() => loadHistory())
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(AUTO_LANGUAGE)
  const [explanation, setExplanation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showClearDialog, setShowClearDialog] = useState(false)

  const effectiveLanguage =
    selectedLanguage === AUTO_LANGUAGE ? detectLanguage(code) : selectedLanguage

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

    const entryId = activeHistoryId || createHistoryId()

    try {
      const response = await fetch(`${API_URL}/api/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          detectedLanguage: effectiveLanguage,
        }),
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
              ? {
                  ...entry,
                  explanation: data.explanation,
                  title: createHistoryTitle(code),
                  code,
                  language: selectedLanguage,
                  detectedLanguage:
                    selectedLanguage === AUTO_LANGUAGE ? effectiveLanguage : undefined,
                }
              : entry
          )
        )
      } else {
        const nextEntry = {
          id: entryId,
          title: createHistoryTitle(code),
          code,
          explanation: data.explanation,
          language: selectedLanguage,
          detectedLanguage:
            selectedLanguage === AUTO_LANGUAGE ? effectiveLanguage : undefined,
          createdAt: new Date().toISOString(),
        }

        setActiveHistoryId(entryId)
        setHistory((currentHistory) => [nextEntry, ...currentHistory].slice(0, MAX_HISTORY_ITEMS))
      }

      generateAITitle(code, entryId)
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const generateAITitle = async (code, entryId) => {
    try {
      const response = await fetch(`${API_URL}/api/generate-title`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) return

      const data = await response.json()
      if (!data?.title) return

      setHistory((currentHistory) =>
        currentHistory.map((entry) =>
          entry.id === entryId ? { ...entry, title: data.title } : entry
        )
      )
    } catch {
      // Silently fail — fallback title (first line of code) remains
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

  const handleLanguageChange = (nextLanguage) => {
    setSelectedLanguage(nextLanguage)

    if (!activeHistoryId) return

    setHistory((currentHistory) =>
      currentHistory.map((entry) =>
        entry.id === activeHistoryId ? { ...entry, language: nextLanguage } : entry
      )
    )
  }

  const handleNewExplanation = () => {
    const activeEntry = history.find((entry) => entry.id === activeHistoryId)

    if (activeEntry && !activeEntry.code.trim()) {
      setCode("")
      setExplanation("")
      setError("")
      setSelectedLanguage(AUTO_LANGUAGE)
      return
    }

    const nextEntry = {
      id: createHistoryId(),
      title: createHistoryTitle(""),
      code: "",
      explanation: "",
      language: AUTO_LANGUAGE,
      createdAt: new Date().toISOString(),
    }

    setCode("")
    setExplanation("")
    setError("")
    setSelectedLanguage(AUTO_LANGUAGE)
    setActiveHistoryId(nextEntry.id)
    setHistory((currentHistory) => [nextEntry, ...currentHistory].slice(0, MAX_HISTORY_ITEMS))
  }

  const handleSelectHistory = (entry) => {
    setCode(entry.code)
    setExplanation(entry.explanation || "")
    setError("")
    setSelectedLanguage(entry.language || AUTO_LANGUAGE)
    setActiveHistoryId(entry.id)
  }

  const handleClearHistory = () => {
    setCode("")
    setExplanation("")
    setError("")
    setHistory([])
    setActiveHistoryId(null)
    setSelectedLanguage(AUTO_LANGUAGE)
  }

  const handleRequestClearHistory = () => {
    if (!history || history.length === 0) return
    setShowClearDialog(true)
  }

  const handleConfirmClearHistory = () => {
    setShowClearDialog(false)
    setCode("")
    setExplanation("")
    setError("")
    setHistory([])
    setActiveHistoryId(null)
    setSelectedLanguage(AUTO_LANGUAGE)
  }

  const handleDeleteEntry = (entryId) => {
    setHistory((currentHistory) => currentHistory.filter((entry) => entry.id !== entryId))
    if (activeHistoryId === entryId) {
      setCode("")
      setExplanation("")
      setError("")
      setActiveHistoryId(null)
      setSelectedLanguage(AUTO_LANGUAGE)
    }
  }

  const handleCancelClearHistory = () => setShowClearDialog(false)

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
            onRequestClearHistory={handleRequestClearHistory}
            onDeleteEntry={handleDeleteEntry}
          />

          <div className="min-w-0 space-y-5">
            <CodeInputPanel
              code={code}
              selectedLanguage={selectedLanguage}
              detectedLanguage={effectiveLanguage}
              onCodeChange={handleCodeChange}
              onLanguageChange={handleLanguageChange}
              onExplain={handleExplain}
              canExplain={Boolean(code.trim()) && !isLoading}
              languageOptions={LANGUAGE_OPTIONS}
              languageLabels={LANGUAGE_LABELS}
            />
            <ExplanationPanel
              explanation={explanation}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </section>

      {showClearDialog && (
        <ClearHistoryDialog
          onConfirm={handleConfirmClearHistory}
          onCancel={handleCancelClearHistory}
        />
      )}
    </main>
  )
}
