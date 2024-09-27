const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { topic, mood, denomination } = req.body;
      
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `Generate a ${denomination} prayer about ${topic} with a ${mood} mood.`,
        max_tokens: 150
      });

      res.status(200).json({ prayer: completion.data.choices[0].text.trim() });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate prayer' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};