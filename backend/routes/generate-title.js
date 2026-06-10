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
          max_tokens: 30,
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content:
                "Generate a short, descriptive title (max 6 words) for the given code snippet. Return ONLY the title, no quotes, no punctuation, no explanation.",
            },
            {
              role: "user",
              content: `Code:\n\`\`\`\n${code.slice(0, 500)}\n\`\`\``,
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
    const title = data.choices?.[0]?.message?.content?.trim() || "Code explanation";

    return res.json({ title });
  } catch (err) {
    console.error("Groq title fetch error:", err);
    return res.status(500).json({
      error: "Internal server error.",
    });
  }
});

export default router;
