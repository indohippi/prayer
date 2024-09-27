const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { prayerTopic, mood, prayerLength, prayerStyle, denomination } = req.body;
      
      const prompt = `Generate a ${prayerLength} ${prayerStyle} prayer for someone who is feeling ${mood} and wants to pray about ${prayerTopic}. The prayer should be appropriate for the ${denomination} faith.`;

      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 200,
        n: 1,
        stop: null,
        temperature: 0.7,
      });

      res.status(200).json({ prayer: completion.data.choices[0].text.trim() });
    } catch (error) {
      console.error('Error generating prayer:', error);
      res.status(500).json({ error: 'Failed to generate prayer' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};