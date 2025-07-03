const express = require('express');
const router = express.Router();

const { getGeneralNews } = require('../services/scraper');

router.get('/general', async (req, res) => {
	const headlines = await getGeneralNews();
	res.json({ headlines });
});

router.post('/filtered', async (req, res) => {
	console.log('Received request to filter headlines');
	const { portfolio } = req.body;
	console.log('Portfolio:', portfolio);
	const headlines = await getGeneralNews();
	const filtered = headlines.filter((headline) =>
		portfolio.some((stock) =>
			headline.toLowerCase().includes(stock.toLowerCase())
		)
	);
	console.log('Filtered headlines:', filtered);
	res.json({ filteredHeadlines: filtered });
});

module.exports = router;
