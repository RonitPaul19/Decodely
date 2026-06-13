import { describe, it, expect } from "vitest"
import { detectLanguage } from "../historyUtils"

describe("detectLanguage: typescript", () => {
  it("detects type annotations on variables", () => {
    expect(detectLanguage("const name: string = \"hi\"")).toBe("typescript")
    expect(detectLanguage("let age: number = 25")).toBe("typescript")
    expect(detectLanguage("const active: boolean = true")).toBe("typescript")
    expect(detectLanguage("const items: string[] = []")).toBe("typescript")
  })

  it("detects interface declarations", () => {
    expect(detectLanguage("interface User {")).toBe("typescript")
    expect(detectLanguage("interface Props {")).toBe("typescript")
  })

  it("detects type aliases", () => {
    expect(detectLanguage("type Status = \"active\" | \"inactive\"")).toBe("typescript")
  })

  it("detects function parameter type annotations", () => {
    expect(detectLanguage("function greet(name: string): void {")).toBe("typescript")
  })

  it("detects realistic code snippets", () => {
    const snippets = [
      `interface User {
    id: number;
    name: string;
    email: string;
}

const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
];

function getUser(id: number): User | undefined {
    return users.find(u => u.id === id);
}`,
      `type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function parseJson(input: string): Result<unknown> {
    try {
        return { ok: true, value: JSON.parse(input) };
    } catch (e) {
        return { ok: false, error: String(e) };
    }
}`,
    ]
    snippets.forEach(code => {
      expect(detectLanguage(code)).toBe("typescript")
    })
  })
})
