import axios from 'axios';

const BASE_URL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

const defaultConfig = {
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
};

// Logging interceptor for manual requests
const logRequest = (method, url) => {
	console.log(`Making ${method.toUpperCase()} request to ${url}`);
};

export const newsAPI = {
	// Get general news headlines
	getGeneralNews: async () => {
		const url = `${BASE_URL}/news/general`;
		try {
			logRequest('get', url);
			const response = await axios.get(url, defaultConfig);
			return response.data;
		} catch (error) {
			console.error('API Error:', error.response?.data || error.message);
			throw new Error(error.response?.data?.message || 'Failed to fetch news');
		}
	},

	// Get filtered news based on portfolio
	getFilteredNews: async (portfolio) => {
		const url = `${BASE_URL}/news/filtered`;
		try {
			logRequest('post', url);
			const response = await axios.post(url, { portfolio }, defaultConfig);
			console.log(response);
			return response.data;
		} catch (error) {
			console.error('API Error:', error.response?.data || error.message);
			throw new Error(
				error.response?.data?.message || 'Failed to fetch filtered news'
			);
		}
	},

	// Get AI analysis of news impact on portfolio
	getAnalysis: async (portfolio, headlines) => {
		const url = `${BASE_URL}/analyze`;
		try {
			logRequest('post', url);
			const response = await axios.post(
				url,
				{ portfolio, headlines },
				defaultConfig
			);
			console.log('Res data ', response.data);
			return response.data;
		} catch (error) {
			console.error('API Error:', error.response?.data || error.message);
			throw new Error(
				error.response?.data?.message || 'Failed to get analysis'
			);
		}
	},
};
