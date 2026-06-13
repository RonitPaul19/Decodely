import { describe, it, expect } from "vitest"
import { detectLanguage } from "../historyUtils"

describe("detectLanguage: ocaml", () => {
  it("detects let and match combination", () => {
    expect(detectLanguage("let x = match y with")).toBe("ocaml")
    expect(detectLanguage("let result = match option with")).toBe("ocaml")
  })

  it("detects fun keyword", () => {
    expect(detectLanguage("let add = fun x y -> x + y")).toBe("ocaml")
    expect(detectLanguage("let apply = fun f x -> f x")).toBe("ocaml")
  })

  it("detects double semicolon terminator", () => {
    expect(detectLanguage("let x = 5;;")).toBe("ocaml")
    expect(detectLanguage('print_endline "hello";;')).toBe("ocaml")
  })

  it("detects realistic code snippets", () => {
    const snippets = [
      `let rec fibonacci n =
    match n with
    | 0 -> 0
    | 1 -> 1
    | _ -> fibonacci (n - 1) + fibonacci (n - 2)

let () = print_endline (string_of_int (fibonacci 10))`,
      `type 'a option =
    | Some of 'a
    | None

let map f = function
    | Some x -> Some (f x)
    | None -> None`,
    ]
    snippets.forEach(code => {
      expect(detectLanguage(code)).toBe("ocaml")
    })
  })
})
