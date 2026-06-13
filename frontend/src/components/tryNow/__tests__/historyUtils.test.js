import { describe, it, expect, beforeEach } from "vitest"
import {
  HISTORY_STORAGE_KEY,
  MAX_HISTORY_ITEMS,
  loadHistory,
  createHistoryId,
  createHistoryTitle,
} from "../historyUtils"

beforeEach(() => {
  localStorage.clear()
})

describe("loadHistory", () => {
  it("returns empty array when nothing is stored", () => {
    expect(loadHistory()).toEqual([])
  })

  it("returns empty array when stored value is not valid JSON", () => {
    localStorage.setItem(HISTORY_STORAGE_KEY, "not-json")
    expect(loadHistory()).toEqual([])
  })

  it("returns empty array when stored value is not an array", () => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify({}))
    expect(loadHistory()).toEqual([])
  })

  it("loads and normalizes stored history entries", () => {
    const entries = [
      { id: "1", title: "hello world", code: "print(1)", explanation: "some explanation", language: "python", detectedLanguage: "python", createdAt: "2025-01-01T00:00:00.000Z" },
    ]
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries))
    const result = loadHistory()
    expect(result).toHaveLength(1)
    expect(result[0].code).toBe("print(1)")
    expect(result[0].title).toBe("hello world")
  })

  it("filters out null entries and limits to MAX_HISTORY_ITEMS", () => {
    const entries = Array.from({ length: 10 }, (_, i) => ({
      id: String(i),
      code: `code ${i}`,
      title: `title ${i}`,
      explanation: "exp",
      createdAt: new Date().toISOString(),
    }))
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries))
    const result = loadHistory()
    expect(result.length).toBeLessThanOrEqual(MAX_HISTORY_ITEMS)
  })
})

describe("createHistoryId", () => {
  it("returns a non-empty string", () => {
    const id = createHistoryId()
    expect(typeof id).toBe("string")
    expect(id.length).toBeGreaterThan(0)
  })
})

describe("createHistoryTitle", () => {
  it("returns 'New explanation' for empty code", () => {
    expect(createHistoryTitle("")).toBe("New explanation")
    expect(createHistoryTitle("   ")).toBe("New explanation")
  })

  it("returns the first line of code", () => {
    expect(createHistoryTitle("const x = 1")).toBe("const x = 1")
  })

  it("truncates first line beyond 45 characters", () => {
    const longLine = "a".repeat(50)
    const result = createHistoryTitle(longLine)
    expect(result).toHaveLength(45)
    expect(result.endsWith("...")).toBe(true)
  })
})
