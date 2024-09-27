// api/generate-prayer.js
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generatePrayer = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { prayerTopic, mood, prayerLength, prayerStyle, denomination } = req.body;
      
      const prompt = `Generate a ${prayerLength} ${prayerStyle} prayer for someone who is feeling ${mood} and wants to pray about ${prayerTopic}. The prayer should be appropriate for the ${denomination} faith.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
      });

      res.status(200).json({ prayer: completion.choices[0].message.content.trim() });
    } catch (error) {
      console.error('Error generating prayer:', error);
      res.status(500).json({ error: 'Failed to generate prayer' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

module.exports = generatePrayer;