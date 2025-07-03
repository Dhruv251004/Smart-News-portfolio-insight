import { useState } from 'react';
import PortfolioInput from './components/PortfolioInput';
import GeneralNews from './components/GeneralNews';
import FilteredNews from './components/FilteredNews';
import { newsAPI } from './utils/api';
import { useEffect } from 'react';

function App() {
	const [portfolio, setPortfolio] = useState([]);
	const [filteredNews, setFilteredNews] = useState([]);
	const [activeTab, setActiveTab] = useState('general');
	const [loading, setLoading] = useState({
		insights: false,
		filteredNews: false,
	});
	const [error, setError] = useState({
		filteredNews: null,
	});

	useEffect(() => {
		console.log('App mounted', process.env.BACKEND_URL);

		setPortfolio(
			localStorage.getItem('portfolio')
				? JSON.parse(localStorage.getItem('portfolio'))
				: []
		);
	}, []);

	const handleGetInsights = async () => {
		if (portfolio.length === 0) return;

		try {
			setFilteredNews([]);
			setError({ filteredNews: null });
			setLoading((prev) => ({ ...prev, insights: true, filteredNews: true }));

			let filteredData;
			try {
				filteredData = await newsAPI.getFilteredNews(portfolio);
				setFilteredNews(filteredData.filteredHeadlines || []);
				setLoading((prev) => ({ ...prev, filteredNews: false }));
				setActiveTab('portfolio');
			} catch (err) {
				setError((prev) => ({ ...prev, filteredNews: err.message }));
				setLoading((prev) => ({ ...prev, filteredNews: false }));
				console.error('Error fetching filtered news:', err);
			}

			setLoading((prev) => ({ ...prev, analysis: false, insights: false }));
		} catch (err) {
			console.error('Error in handleGetInsights:', err);
			setLoading({ insights: false, filteredNews: false });
		}
	};
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 bg-hero-pattern'>
			{/* Header */}
			<header className='relative overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 opacity-90'></div>
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					<div className='text-center'>
						<div className='flex justify-center mb-6'>
							<div className='p-4 bg-white/20 backdrop-blur-sm rounded-3xl shadow-large'>
								<svg
									className='w-12 h-12 text-white'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
									/>
								</svg>
							</div>
						</div>
						<h1 className='text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight'>
							Smart News + Portfolio
							<span className='block text-3xl md:text-5xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent h-16'>
								Insights
							</span>
						</h1>
						<p className='text-xl text-white/90 max-w-2xl mx-auto leading-relaxed'>
							AI-powered news analysis for your stock portfolio with intelligent
							insights and market intelligence
						</p>
						<div className='flex justify-center mt-8'>
							<div className='flex items-center space-x-6 text-white/80'>
								<div className='flex items-center space-x-2'>
									<div className='w-2 h-2 bg-success-400 rounded-full animate-pulse'></div>
									<span className='text-sm font-medium'>Live Market Data</span>
								</div>
								<div className='flex items-center space-x-2'>
									<div className='w-2 h-2 bg-warning-400 rounded-full animate-pulse'></div>
									<span className='text-sm font-medium'>AI Analysis</span>
								</div>
								<div className='flex items-center space-x-2'>
									<div className='w-2 h-2 bg-secondary-400 rounded-full animate-pulse'></div>
									<span className='text-sm font-medium'>
										Real-time Insights
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10'>
				<div className='grid grid-cols-1 gap-8'>
					<div className='space-y-8'>
						<div className='animate-slide-up'>
							<PortfolioInput
								portfolio={portfolio}
								setPortfolio={setPortfolio}
								onGetInsights={handleGetInsights}
								isLoading={loading.insights}
							/>
						</div>
					</div>

					{/* Tabs */}
					<div className='flex space-x-6 justify-center mt-8'>
						<button
							onClick={() => setActiveTab('general')}
							className={`px-6 py-2 font-semibold rounded-xl ${
								activeTab === 'general'
									? 'bg-primary-600 text-white'
									: 'bg-white text-primary-600 border border-primary-200'
							}`}>
							Market News
						</button>
						<button
							onClick={() => {
								setActiveTab('portfolio');
								if (portfolio.length !== 0) {
									handleGetInsights();
								}
							}}
							className={`px-6 py-2 font-semibold rounded-xl ${
								activeTab === 'portfolio'
									? 'bg-primary-600 text-white'
									: 'bg-white text-primary-600 border border-primary-200'
							}`}>
							Portfolio News
						</button>
					</div>

					{/* Tab content */}
					<div className='mt-8'>
						{activeTab === 'general' ? (
							<GeneralNews />
						) : (
							<FilteredNews
								portfolio={portfolio}
								filteredNews={filteredNews}
								loading={loading.filteredNews}
								error={error.filteredNews}
							/>
						)}
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className='bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 mt-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					<div className='text-center'>
						<div className='flex justify-center mb-6'>
							<div className='p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl shadow-large'>
								<svg
									className='w-8 h-8 text-white'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
									/>
								</svg>
							</div>
						</div>
						<h3 className='text-2xl font-bold text-white mb-2'>
							Smart News + Portfolio Insights
						</h3>
						<p className='text-neutral-400 mb-6 max-w-md mx-auto'>
							Empowering investors with AI-driven market intelligence and
							personalized portfolio analysis
						</p>
						<div className='flex justify-center space-x-8 text-sm text-neutral-500'>
							<span className='flex items-center space-x-2'>
								<div className='w-2 h-2 bg-primary-500 rounded-full'></div>
								<span>Powered by AI</span>
							</span>
							<span className='flex items-center space-x-2'>
								<div className='w-2 h-2 bg-secondary-500 rounded-full'></div>
								<span>Built with React</span>
							</span>
							<span className='flex items-center space-x-2'>
								<div className='w-2 h-2 bg-accent-500 rounded-full'></div>
								<span>Tailwind CSS</span>
							</span>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default App;
