import { describe, it, expect } from "vitest"
import { detectLanguage } from "../historyUtils"

describe("detectLanguage: javascript", () => {
  it("detects import/export ES module syntax", () => {
    expect(detectLanguage("import React from 'react'")).toBe("javascript")
    expect(detectLanguage('import { useState } from "react"')).toBe("javascript")
    expect(detectLanguage("export default function App() {}")).toBe("javascript")
  })

  it("detects CommonJS require", () => {
    expect(detectLanguage("const fs = require('fs')")).toBe("javascript")
    expect(detectLanguage("const { readFile } = require('fs/promises')")).toBe("javascript")
  })

  it("detects console.log/error/warn", () => {
    expect(detectLanguage('console.log("hello world")')).toBe("javascript")
    expect(detectLanguage('console.error("something broke")')).toBe("javascript")
    expect(detectLanguage("console.warn('deprecated')")).toBe("javascript")
  })

  it("detects const/let/var declarations", () => {
    expect(detectLanguage("const x = 42")).toBe("javascript")
    expect(detectLanguage("let count = 0")).toBe("javascript")
    expect(detectLanguage("var old = true")).toBe("javascript")
  })

  it("detects arrow functions", () => {
    expect(detectLanguage("const add = (a, b) => a + b")).toBe("javascript")
    expect(detectLanguage("setTimeout(() => {}, 1000)")).toBe("javascript")
  })

  it("detects realistic code snippets", () => {
    const snippets = [
      `import express from "express"
const app = express()
app.get("/", (req, res) => res.send("ok"))
app.listen(3000)`,
      `function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}`,
      `const { exec } = require("child_process")
exec("ls", (err, stdout) => console.log(stdout))`,
    ]
    snippets.forEach(code => {
      expect(detectLanguage(code)).toBe("javascript")
    })
  })

  it("does not falsely detect Java-style imports as JS", () => {
    expect(detectLanguage("import java.util.List;")).not.toBe("javascript")
  })
})
