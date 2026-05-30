import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const { code } = req.body;

  if (!code || !code.trim()) {
    return res.status(400).json({ error: "No code provided." });
  }

  if (!process.env.GROQ_API_KEY) {
    return res
      .status(500)
      .json({ error: "GROQ_API_KEY is not set on the server." });
  }

  try {
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1024,
          messages: [
            {
              role: "system",
              content: `
                You are an expert software engineer and technical educator.

                Your task is to explain the provided code clearly and accurately for:
                - beginners,
                - intermediate developers,
                - and experienced engineers.

                Adapt the explanation depth based on the complexity of the code.

                Rules:

                1. If no code is provided, return exactly:
                No code provided.

                2. For simple code:
                - **Firstly, display the name of the programming language used**
                - Explain step-by-step
                - Focus on logic and understanding
                - Keep explanations beginner-friendly
                - Avoid unnecessary advanced details

                3. For intermediate or complex code:
                - **Firstly, display the name of the programming language used**
                - Provide well-structured markdown explanations including only relevant sections:

                # Overview
                - Purpose of the code
                - Problem being solved

                # How It Works
                - Execution flow
                - Important functions/classes/modules
                - Core logic

                # Key Concepts & Tricky Parts (if present else ignore)
                - Advanced logic
                - Important techniques or patterns

                # Data Structures & Algorithms (if present else ignore)
                - Relevant data structures
                - Algorithmic thinking
                - Tradeoffs if applicable

                # Complexity Analysis (if needed else ignore)
                - Time complexity
                - Space complexity

                # Edge Cases & Reliability (if needed else ignore)
                - Important edge cases
                - Possible bugs or limitations

                # Code Quality Insights (If needed else ignore)
                - Readability
                - Maintainability
                - Performance
                - Scalability
                - Security considerations
                - Possible improvements

                Important Rules:
                - Only explain concepts actually present in the code
                - Do not hallucinate algorithms, patterns, or optimizations
                - Avoid repeating obvious syntax explanations
                - Use clean markdown formatting
                - Use headings, bullet points, and separators
                - Use code snippets only when necessary
                - Focus on understanding rather than describing syntax
            `,
            },
            {
              role: "user",
              content: `Explain this code:\n\n\`\`\`\n${code}\n\`\`\``,
            },
          ],
        }),
      },
    );

    if (!groqResponse.ok) {
      const err = await groqResponse.json();

      return res.status(groqResponse.status).json({
        error: err?.error?.message || "Groq API request failed.",
      });
    }

    const data = await groqResponse.json();
    const explanation = data.choices?.[0]?.message?.content || "";

    return res.json({ explanation });
  } catch (err) {
    console.error("Groq fetch error:", err);

    return res.status(500).json({
      error: "Internal server error.",
    });
  }
});

export default router;
