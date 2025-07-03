import { useState, useEffect } from 'react';
import { newsAPI } from '../utils/api';

const LoadingSkeleton = () => (
	<div className='space-y-4'>
		{[...Array(6)].map((_, i) => (
			<div
				key={i}
				className='news-card'>
				<div className='flex items-start gap-4'>
					<div className='loading-skeleton w-12 h-12 rounded-full'></div>
					<div className='flex-1 space-y-3'>
						<div className='loading-skeleton h-4 w-3/4'></div>
						<div className='loading-skeleton h-3 w-1/2'></div>
						<div className='flex gap-2'>
							<div className='loading-skeleton h-6 w-20 rounded-full'></div>
							<div className='loading-skeleton h-6 w-16 rounded-full'></div>
						</div>
					</div>
				</div>
			</div>
		))}
	</div>
);

const NewsCard = ({ headline, index }) => (
	<div className='news-card group'>
		<div className='flex items-start gap-4'>
			<div className='number-badge bg-gradient-to-br from-red-100 to-red-200 text-red-700 group-hover:from-red-200 group-hover:to-red-300'>
				{index + 1}
			</div>
			<div className='flex-1'>
				<p className='text-neutral-800 font-semibold leading-relaxed mb-3 group-hover:text-neutral-900 transition-colors'>
					{headline}
				</p>
				<div className='flex items-center gap-3'>
					<span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'>
						<svg
							className='w-3 h-3 mr-1.5'
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
						Market News
					</span>
					<span className='text-xs text-neutral-400'>•</span>
					<span className='text-xs text-neutral-500 font-medium'>
						Stock Market
					</span>
					<span className='text-xs text-neutral-400'>•</span>
					<div className='flex items-center gap-1'>
						<div className='w-2 h-2 bg-success-500 rounded-full animate-pulse'></div>
						<span className='text-xs text-success-600 font-medium'>Live</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const GeneralNews = () => {
	const [news, setNews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await newsAPI.getGeneralNews();
				setNews(data.headlines || []);
			} catch (err) {
				setError(err.message);
				console.error('Error fetching news:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchNews();
	}, []);

	const handleRefresh = () => {
		setNews([]);
		const fetchNews = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await newsAPI.getGeneralNews();
				setNews(data.headlines || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchNews();
	};

	return (
		<div className='section-card'>
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center gap-4'>
					<div className='icon-wrapper bg-gradient-to-br from-red-100 to-red-200'>
						<svg
							className='w-6 h-6 text-red-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
							/>
						</svg>
					</div>
					<div>
						<h2 className='text-2xl font-bold gradient-text'>Market News</h2>
						<p className='text-neutral-600 text-sm'>
							Latest financial market updates
						</p>
					</div>
				</div>
				<button
					onClick={handleRefresh}
					disabled={loading}
					className='icon-wrapper bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-600 hover:from-neutral-200 hover:to-neutral-300 hover:text-neutral-700'>
					<svg
						className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
						/>
					</svg>
				</button>
			</div>

			{loading && <LoadingSkeleton />}

			{error && (
				<div className='text-center py-12'>
					<div className='w-16 h-16 bg-gradient-to-br from-error-100 to-error-200 rounded-full flex items-center justify-center mx-auto mb-4'>
						<svg
							className='w-8 h-8 text-error-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					</div>
					<h3 className='text-lg font-semibold text-neutral-800 mb-2'>
						Failed to load news
					</h3>
					<p className='text-neutral-600 mb-6 max-w-md mx-auto'>{error}</p>
					<button
						onClick={handleRefresh}
						className='btn-primary flex items-center justify-center mx-auto'>
						<svg
							className='w-5 h-5 mr-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
							/>
						</svg>
						Try Again
					</button>
				</div>
			)}

			{!loading && !error && news.length === 0 && (
				<div className='text-center py-12'>
					<div className='w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4'>
						<svg
							className='w-8 h-8 text-neutral-500'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
							/>
						</svg>
					</div>
					<h3 className='text-lg font-semibold text-neutral-800 mb-2'>
						No news available
					</h3>
					<p className='text-neutral-600'>
						Check back later for the latest market updates
					</p>
				</div>
			)}

			{!loading && !error && news.length > 0 && (
				<div className='space-y-4'>
					{news.map((headline, index) => (
						<div
							key={index}
							className='animate-fade-in'
							style={{ animationDelay: `${index * 0.1}s` }}>
							<NewsCard
								headline={headline}
								index={index}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default GeneralNews;
