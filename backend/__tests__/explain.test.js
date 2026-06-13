import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach, vi } from "vitest"
import express from "express"
import request from "supertest"

const ORIGINAL_API_KEY = process.env.GROQ_API_KEY

beforeAll(() => {
  process.env.GROQ_API_KEY = "test-key"
})

afterAll(() => {
  process.env.GROQ_API_KEY = ORIGINAL_API_KEY
})

beforeEach(() => {
  vi.resetModules()
  process.env.GROQ_API_KEY = "test-key"
})

afterEach(() => {
  vi.unstubAllGlobals()
})

async function createApp() {
  const app = express()
  app.use(express.json())
  const { default: explainRouter } = await import("../routes/explain.js")
  app.use("/api/explain", explainRouter)
  return app
}

describe("POST /api/explain", () => {
  it("returns 400 when no code is provided", async () => {
    const app = await createApp()
    const res = await request(app).post("/api/explain").send({})
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty("error")
  })

  it("returns 400 when code is empty", async () => {
    const app = await createApp()
    const res = await request(app).post("/api/explain").send({ code: "" })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty("error")
  })

  it("returns 400 when code is only whitespace", async () => {
    const app = await createApp()
    const res = await request(app).post("/api/explain").send({ code: "   " })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty("error")
  })

  it("returns 200 with explanation on successful Groq API call", async () => {
    const fakeContent = "# Python\nThis code prints hello."
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: fakeContent } }],
      }),
    }))

    const app = await createApp()
    const res = await request(app)
      .post("/api/explain")
      .send({ code: "print('hello')", language: "python" })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("explanation", fakeContent)
  })

  it("forwards Groq API error status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ error: { message: "Rate limited by Groq" } }),
    }))

    const app = await createApp()
    const res = await request(app)
      .post("/api/explain")
      .send({ code: "print('hello')" })

    expect(res.status).toBe(429)
    expect(res.body).toHaveProperty("error")
  })

  it("rejects requests beyond 20 per day with 429", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: "ok" } }],
      }),
    }))

    const app = await createApp()
    const promises = Array.from({ length: 21 }, () =>
      request(app).post("/api/explain").send({ code: "x" })
    )
    const results = await Promise.all(promises)

    const okCount = results.filter(r => r.status === 200).length
    const blockedCount = results.filter(r => r.status === 429).length

    expect(okCount).toBe(20)
    expect(blockedCount).toBe(1)
  })
})
