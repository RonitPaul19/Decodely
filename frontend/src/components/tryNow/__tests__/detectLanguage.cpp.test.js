import { describe, it, expect } from "vitest"
import { detectLanguage } from "../historyUtils"

describe("detectLanguage: cpp", () => {
  it("detects #include <iostream> and C++ headers", () => {
    expect(detectLanguage("#include <iostream>")).toBe("cpp")
    expect(detectLanguage("#include <vector>")).toBe("cpp")
    expect(detectLanguage("#include <string>")).toBe("cpp")
  })

  it("detects std:: prefix", () => {
    expect(detectLanguage("std::cout << \"hi\";")).toBe("cpp")
    expect(detectLanguage("std::vector<int> vec;")).toBe("cpp")
    expect(detectLanguage("std::string name;")).toBe("cpp")
  })

  it("detects cout/cin", () => {
    expect(detectLanguage("cout << \"hello\";")).toBe("cpp")
    expect(detectLanguage("cin >> x;")).toBe("cpp")
  })

  it("detects realistic code snippets", () => {
    const snippets = [
      `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      `#include <vector>
#include <algorithm>

std::vector<int> sortVector(std::vector<int> v) {
    std::sort(v.begin(), v.end());
    return v;
}`,
    ]
    snippets.forEach(code => {
      expect(detectLanguage(code)).toBe("cpp")
    })
  })
})
