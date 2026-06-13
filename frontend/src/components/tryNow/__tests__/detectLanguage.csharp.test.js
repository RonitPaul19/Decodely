import { describe, it, expect } from "vitest"
import { detectLanguage } from "../historyUtils"

describe("detectLanguage: csharp", () => {
  it("detects using System directive", () => {
    expect(detectLanguage("using System;")).toBe("csharp")
    expect(detectLanguage("using System.Collections.Generic;")).toBe("csharp")
    expect(detectLanguage("using System.Linq;")).toBe("csharp")
  })

  it("detects namespace declarations", () => {
    expect(detectLanguage("namespace MyApp {")).toBe("csharp")
    expect(detectLanguage("namespace ConsoleApp1")).toBe("csharp")
  })

  it("detects Console.WriteLine/ReadLine", () => {
    expect(detectLanguage('Console.WriteLine("hello")')).toBe("csharp")
    expect(detectLanguage("Console.ReadLine()")).toBe("csharp")
  })

  it("detects realistic code snippets", () => {
    const snippets = [
      `using System;

namespace HelloWorld {
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello, World!");
        }
    }
}`,
      `using System;
using System.Collections.Generic;

class Calculator {
    static int Add(int a, int b) {
        return a + b;
    }

    static void Main() {
        Console.WriteLine(Add(3, 4));
    }
}`,
    ]
    snippets.forEach(code => {
      expect(detectLanguage(code)).toBe("csharp")
    })
  })
})
