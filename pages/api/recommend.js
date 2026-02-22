import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key = process.env.GROQ_API_KEY;
  const client = new Groq({ apiKey: key });

  try {
    const { formData } = req.body;

    const prompt = `
User skin profile:
${JSON.stringify(formData, null, 2)}

Give a short, friendly skincare routine.
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",   // ✅ CORRECT MODEL
      messages: [
        { role: "system", content: "You are a skincare expert." },
        { role: "user", content: prompt }
      ],
    });

    const recommendation = completion.choices[0].message.content;

    res.status(200).json({ recommendation });

  } catch (err) {
    console.error("Groq error FULL:", err);
    res.status(500).json({
      error: "Groq request failed",
      detail: err.message
    });
  }
}