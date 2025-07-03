const express = require('express');
const router = express.Router();
const { analyzeNews } = require('../services/ai');

// POST /analyze
// Body: { headlines: [...], portfolio: [...] }
router.post('/', async (req, res) => {
	try {
		const { headlines, portfolio } = req.body;

		if (!Array.isArray(headlines) || !Array.isArray(portfolio)) {
			return res
				.status(400)
				.json({ error: 'headlines and portfolio must be arrays' });
		}

		const analysis = await analyzeNews(headlines, portfolio);
		res.json({ analysis });
	} catch (err) {
		console.error('OpenAI Error:', err.message);
		res.status(500).json({ error: 'Failed to analyze news' });
	}
});

module.exports = router;
