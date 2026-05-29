import { Router } from "express"

const router = Router()

router.post("/", async (req, res) => {
  const { code } = req.body

  if (!code || !code.trim()) {
    return res.status(400).json({ error: "No code provided." })
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "GROQ_API_KEY is not set on the server." })
  }

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content: `
              You are an expert software engineer and technical educator.

              Your task is to explain the provided code in a clear, structured, and beginner-friendly way while also including deeper insights useful for experienced developers.

              Follow these rules carefully:

              # 1. If No Code Is Provided

              Return the following message exactly:
              No code provided.

              # 2. If the Code Is Simple

              Explain the code step-by-step in a way that a complete beginner can understand.

              Include:

              * What the code does
              * How the logic works
              * Explanation of important lines
              * Beginner-friendly examples if useful

              # 3. If the Code Is Complex

              Provide a detailed, well-structured explanation with proper formatting.

              Your explanation MUST include:

              # **Overview**

              * Explain the overall purpose of the code.
              * Describe the problem the code is solving.

              # **How the Code Works**

              * Explain the flow of execution step-by-step.
              * Explain important functions, classes, modules, and logic.
              * Skip tiny obvious details if they are not important.

              # **Key Concepts & Tricky Parts**

              * Explain any advanced logic or tricky concepts used.
              * Mention important programming patterns, techniques, or optimizations.

              # **Data Structures & Algorithms**

              * Explain which data structures are used and why.
              * Explain any algorithms or algorithmic thinking involved.
              * Mention if there are better alternatives and why or why not.

              # **Time & Space Complexity**

              * Clearly explain:

                * Time Complexity
                * Space Complexity
              * Explain why the complexity is what it is.

              # **Edge Cases**

              * Mention important edge cases handled by the code.
              * Mention possible bugs or situations the code may fail in.

              # **Code Quality Insights**

              * Mention:

                * Good practices used
                * Potential improvements
                * Readability or maintainability insights

              # Formatting Rules

              * Use clean markdown formatting.
              * {{Generate markdown lines to divide sections.}}
              * Use large section headings.
              * Bold important concepts and titles.
              * Use bullet points where helpful.
              * Use code snippets only when necessary.
              * Make the explanation visually easy to read.

              # Important

              Your explanation should:

              * Be easy enough for beginners to follow
              * Still provide valuable insights for experienced developers
              * Be concise when possible, but detailed when necessary
              * Focus more on understanding than just describing syntax
            `,
          },
          {
            role: "user",
            content: `Explain this code:\n\n\`\`\`\n${code}\n\`\`\``,
          },
        ],
      }),
    })

    if (!groqResponse.ok) {
      const err = await groqResponse.json()

      return res.status(groqResponse.status).json({
        error: err?.error?.message || "Groq API request failed.",
      })
    }

    const data = await groqResponse.json()
    const explanation = data.choices?.[0]?.message?.content || ""

    return res.json({ explanation })
  } catch (err) {
    console.error("Groq fetch error:", err)

    return res.status(500).json({
      error: "Internal server error.",
    })
  }
})

export default router
