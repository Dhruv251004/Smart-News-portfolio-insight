const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
	apiKey: process.env.OPENROUTER_API_KEY,
	baseURL: 'https://openrouter.ai/api/v1',
	defaultHeaders: {
		'HTTP-Referer': 'http://localhost:5000',
		'X-Title': 'Smart News + Portfolio Insights',
	},
});

async function analyzeNews(headlines, portfolio) {
	const results = [];

	for (const headline of headlines) {
		const messages = [
			{
				role: 'user',
				content: `
You are a financial analyst AI.

Given the following stock portfolio: [${portfolio.join(', ')}]

Rate the impact of this news headline on any relevant stock in the portfolio. If none are relevant, reply with an empty matches array.

Headline: "${headline}"

Respond only in JSON format:
{
  "headline": "<headline>",
  "matches": [
    {
      "stock": "<portfolio stock>",
      "impact": "Positive" | "Neutral" | "Negative",
      "reason": "<brief reason>"
    }
  ]
}
				`.trim(),
			},
		];

		try {
			const response = await openai.chat.completions.create({
				model: 'deepseek/deepseek-r1:free',
				messages,
				temperature: 0.5,
				max_tokens: headline.length * 2 + 300, // Adjusted to allow for longer responses
			});

			const raw = response.choices[0].message.content;

			// Try to extract and parse JSON safely
			const jsonStart = raw.indexOf('{');
			const jsonEnd = raw.lastIndexOf('}');
			const jsonString = raw.slice(jsonStart, jsonEnd + 1);

			const parsed = JSON.parse(jsonString);
			results.push(parsed);
		} catch (err) {
			console.error(
				`❌ Failed to analyze headline: "${headline}"`,
				err.message
			);
			results.push({
				headline,
				matches: [],
			});
		}
	}

	return results;
}

module.exports = { analyzeNews };
