import { AUTO_LANGUAGE } from "../../data/languageData"

export const HISTORY_STORAGE_KEY = "decodelyExplanationHistory"
export const MAX_HISTORY_ITEMS = 8

export function loadHistory() {
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
    language: typeof entry.language === "string" ? entry.language : AUTO_LANGUAGE,
    detectedLanguage: typeof entry.detectedLanguage === "string" ? entry.detectedLanguage : null,
    createdAt: isValidDate(entry.createdAt) ? entry.createdAt : new Date().toISOString(),
  }
}

function isValidDate(date) {
  return Boolean(date) && !Number.isNaN(new Date(date).getTime())
}

export function createHistoryId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function createHistoryTitle(code) {
  const trimmed = code.trim()
  if (!trimmed) return "New explanation"
  const firstLine = trimmed.split("\n")[0].trim()
  return firstLine.length > 45 ? `${firstLine.slice(0, 42)}...` : firstLine
}

export function detectLanguage(code) {
  if (!code.trim()) return AUTO_LANGUAGE
  const trimmed = code.trim()
  if (trimmed.startsWith("import ") || trimmed.includes("console.log")) return "javascript"
  if (trimmed.includes("def ") || trimmed.includes("print(")) return "python"
  if (trimmed.includes("public static void main")) return "java"
  return AUTO_LANGUAGE
}
