import { describe, it, expect } from "vitest"
import { detectLanguage } from "../historyUtils"

describe("detectLanguage: java", () => {
  it("detects public static void main", () => {
    expect(detectLanguage("public static void main")).toBe("java")
    expect(detectLanguage("public static void main(String[] args) {")).toBe("java")
  })

  it("detects System.out/err/in prints", () => {
    expect(detectLanguage('System.out.println("hello")')).toBe("java")
    expect(detectLanguage('System.err.println("error")')).toBe("java")
    expect(detectLanguage('System.out.printf("%d", x)')).toBe("java")
  })

  it("detects Java-style imports (no 'from')", () => {
    expect(detectLanguage("import java.util.List;")).toBe("java")
    expect(detectLanguage("import java.io.*;")).toBe("java")
    expect(detectLanguage("import org.springframework.boot.SpringApplication;")).toBe("java")
  })

  it("detects public/private class declarations", () => {
    expect(detectLanguage("public class HelloWorld {")).toBe("java")
    expect(detectLanguage("private class Helper {")).toBe("java")
  })

  it("detects realistic code snippets", () => {
    const snippets = [
      `public class Fibonacci {
    public static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        System.out.println(fib(10));
    }
}`,
      `import java.util.*;
import java.io.*;

public class FileReader {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new FileReader(args[0]));
        System.out.println(br.readLine());
    }
}`,
    ]
    snippets.forEach(code => {
      expect(detectLanguage(code)).toBe("java")
    })
  })
})
