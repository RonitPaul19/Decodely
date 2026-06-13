import { Router } from "express";
import rateLimit from "express-rate-limit";

const router = Router();

const explainLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 20,
  message: { error: "Daily limit reached. You can explain up to 20 code snippets per day. Try again tomorrow." },
  standardHeaders: true,
  legacyHeaders: false,
})

router.post("/", explainLimiter, async (req, res) => {
  const { code, language } = req.body;

  if (!code || !code.trim()) {
    return res.status(400).json({ error: "No code provided." });
  }

  if (!process.env.GROQ_API_KEY) {
    return res
      .status(500)
      .json({ error: "GROQ_API_KEY is not set on the server." });
  }

  try {
      const normalizedLanguage = typeof language === "string" ? language : "auto"
      const languageHint = normalizedLanguage === "auto"
        ? "If the language is not obvious from the code, infer the programming language and mention it first."
        : `The user selected ${normalizeLanguageLabel(normalizedLanguage)} as the language.`

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

                # **Sample input(if present) and output** (*Imp*)

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
              role: "system",
              content: languageHint,
            },
            {
              role: "user",
              content: `Explain this code${normalizedLanguage !== "auto" ? ` as ${normalizeLanguageLabel(normalizedLanguage)}` : ""}:\n\n\`\`\`\n${code}\n\`\`\``,
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

function normalizeLanguageLabel(language) {
  const labels = {
    auto: "Auto-detect",
    javascript: "JavaScript",
    python: "Python",
    java: "Java",
    csharp: "C#",
    c: "C",
    cpp: "C++",
    ocaml: "OCaml",
    typescript: "TypeScript",
    go: "Go",
  }

  return labels[language] || "the correct programming language"
}

export default router;
