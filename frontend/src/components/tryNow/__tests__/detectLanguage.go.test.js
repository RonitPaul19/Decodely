import { describe, it, expect } from "vitest"
import { detectLanguage } from "../historyUtils"

describe("detectLanguage: go", () => {
  it("detects package main", () => {
    expect(detectLanguage("package main")).toBe("go")
  })

  it("detects func main and function declarations", () => {
    expect(detectLanguage("func main() {")).toBe("go")
    expect(detectLanguage("func add(a int, b int) int {")).toBe("go")
  })

  it("detects fmt package calls", () => {
    expect(detectLanguage('fmt.Println("hello")')).toBe("go")
    expect(detectLanguage('fmt.Printf("value: %d", x)')).toBe("go")
    expect(detectLanguage('fmt.Sprintf("hello %s", name)')).toBe("go")
  })

  it("detects := short variable declaration", () => {
    expect(detectLanguage("x := 42")).toBe("go")
    expect(detectLanguage("name := \"hello\"")).toBe("go")
  })

  it("detects realistic code snippets", () => {
    const snippets = [
      `package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    fmt.Println(fibonacci(10))
}`,
      `package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}`,
    ]
    snippets.forEach(code => {
      expect(detectLanguage(code)).toBe("go")
    })
  })
})
