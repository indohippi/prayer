// api/daily-verses.js
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getDailyVerses = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { denomination, date } = req.body;
      
      const prompt = `Provide 3 relevant Bible verses for ${denomination} followers on ${date}. For each verse, include the verse text and its reference.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
      });

      const versesText = completion.choices[0].message.content.trim();
      const verses = versesText.split('\n\n').map(verse => {
        const [text, reference] = verse.split('\n');
        return { text, reference };
      });

      res.status(200).json({ verses });
    } catch (error) {
      console.error('Error generating daily verses:', error);
      res.status(500).json({ error: 'Failed to generate daily verses' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

module.exports = getDailyVerses;