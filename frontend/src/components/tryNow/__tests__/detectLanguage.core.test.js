import { describe, it, expect } from "vitest"
import { detectLanguage } from "../historyUtils"

describe("detectLanguage: edge cases", () => {
  it("returns auto for empty string", () => {
    expect(detectLanguage("")).toBe("auto")
  })

  it("returns auto for whitespace-only strings", () => {
    expect(detectLanguage("   ")).toBe("auto")
    expect(detectLanguage("\n\t  \n")).toBe("auto")
  })

  it("returns auto for completely unknown code", () => {
    expect(detectLanguage("rusty code here")).toBe("auto")
    expect(detectLanguage("some random text")).toBe("auto")
    expect(detectLanguage("")).toBe("auto")
  })

  it("returns auto for made-up syntax", () => {
    expect(detectLanguage("!@#$%^&*()")).toBe("auto")
    expect(detectLanguage("foo bar baz qux")).toBe("auto")
  })
})
