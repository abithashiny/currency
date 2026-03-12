const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const processChat = async (message) => {
  try {

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are a forex and currency assistant.

Rules:
- Give SHORT answers (2–3 sentences maximum)
- Focus only on currency markets
- Be clear and simple
- Avoid long explanations
`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return {
      response: completion.choices[0].message.content,
      type: "ai"
    };

  } catch (error) {

    console.error("Groq error:", error.message);

    return {
      response: "AI service error.",
      type: "error"
    };
  }
};

module.exports = { processChat };