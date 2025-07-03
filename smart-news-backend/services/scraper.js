const axios = require('axios');
const cheerio = require('cheerio');

async function getGeneralNews(pages = 3) {
	const headlines = new Set();

	for (let i = 1; i <= pages; i++) {
		const url =
			i === 1
				? 'https://www.moneycontrol.com/news/business/markets/'
				: `https://www.moneycontrol.com/news/business/markets/page-${i}/`;

		try {
			const { data } = await axios.get(url);
			const $ = cheerio.load(data);

			$('li.clearfix').each((_, el) => {
				const headline = $(el).find('h2').text().trim();
				if (headline) headlines.add(headline);
			});
		} catch (error) {
			console.error(`Failed to scrape page ${i}:`, error.message);
		}
	}

	return Array.from(headlines);
}

module.exports = { getGeneralNews };
