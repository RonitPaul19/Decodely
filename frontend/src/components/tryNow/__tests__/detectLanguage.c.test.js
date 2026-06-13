import { describe, it, expect } from "vitest"
import { detectLanguage } from "../historyUtils"

describe("detectLanguage: c", () => {
  it("detects #include <stdio.h>", () => {
    expect(detectLanguage("#include <stdio.h>")).toBe("c")
  })

  it("detects printf and scanf", () => {
    expect(detectLanguage('printf("hello world");')).toBe("c")
    expect(detectLanguage('printf("%d\\n", x);')).toBe("c")
    expect(detectLanguage("scanf(\"%d\", &x);")).toBe("c")
  })

  it("detects realistic code snippets", () => {
    const snippets = [
      `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
      `#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int n = 10;
    printf("%d\\n", fibonacci(n));
    return 0;
}`,
    ]
    snippets.forEach(code => {
      expect(detectLanguage(code)).toBe("c")
    })
  })
})
