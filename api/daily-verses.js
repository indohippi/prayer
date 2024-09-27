const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { denomination, date, forceNew } = req.body;
      
      const prompt = `Provide 3 relevant Bible verses for ${denomination} followers on ${date}. For each verse, include the verse text and its reference.`;

      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 300,
        n: 1,
        stop: null,
        temperature: 0.7,
      });

      const versesText = completion.data.choices[0].text.trim();
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