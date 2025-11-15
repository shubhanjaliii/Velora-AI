import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const { formData } = req.body;

    const prompt = `
    You are an AI skincare expert. Based on the following user details, recommend:
    - A morning and night skincare routine
    - 3 healthy lifestyle or diet tips
    - 2 precautions specific to their skin type or condition

    User details:
    ${JSON.stringify(formData, null, 2)}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a dermatologist assistant." },
        { role: "user", content: prompt },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ recommendation: reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
