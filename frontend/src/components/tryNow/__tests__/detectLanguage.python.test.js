import { describe, it, expect } from "vitest"
import { detectLanguage } from "../historyUtils"

describe("detectLanguage: python", () => {
  it("detects def function definitions", () => {
    expect(detectLanguage("def hello():")).toBe("python")
    expect(detectLanguage("def calculate_sum(a, b):")).toBe("python")
    expect(detectLanguage("def main():")).toBe("python")
  })

  it("detects print function calls", () => {
    expect(detectLanguage('print("hello world")')).toBe("python")
    expect(detectLanguage("print(42)")).toBe("python")
    expect(detectLanguage("print(f\"Value is {x}\")")).toBe("python")
  })

  it("detects if __name__ guard", () => {
    expect(detectLanguage('if __name__ == "__main__":')).toBe("python")
    expect(detectLanguage("if __name__ == '__main__':")).toBe("python")
  })

  it("detects class definitions by indentation style", () => {
    expect(detectLanguage("class MyClass:")).not.toBe("javascript")
  })

  it("detects realistic code snippets", () => {
    const snippets = [
      `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
      `import sys
def main():
    args = sys.argv[1:]
    print(f"Arguments: {args}")

if __name__ == "__main__":
    main()`,
      `def read_file(path):
    try:
        with open(path, "r") as f:
            return f.read()
    except FileNotFoundError:
        return None`,
    ]
    snippets.forEach(code => {
      expect(detectLanguage(code)).toBe("python")
    })
  })
})
