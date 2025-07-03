import { useState, useEffect } from 'react';

const LoadingSkeleton = () => (
	<div className='space-y-4'>
		{[...Array(4)].map((_, i) => (
			<div
				key={i}
				className='news-card'>
				<div className='flex items-start gap-4'>
					<div className='loading-skeleton w-12 h-12 rounded-full'></div>
					<div className='flex-1 space-y-3'>
						<div className='loading-skeleton h-4 w-3/4'></div>
						<div className='loading-skeleton h-3 w-1/2'></div>
						<div className='flex gap-2'>
							<div className='loading-skeleton h-6 w-24 rounded-full'></div>
							<div className='loading-skeleton h-6 w-16 rounded-full'></div>
						</div>
					</div>
				</div>
			</div>
		))}
	</div>
);

const ImpactBadge = ({ impact }) => {
	const getImpactStyles = (impact) => {
		switch (impact?.toLowerCase()) {
			case 'positive':
				return 'impact-badge impact-positive';
			case 'negative':
				return 'impact-badge impact-negative';
			default:
				return 'impact-badge impact-neutral';
		}
	};

	const getImpactIcon = (impact) => {
		switch (impact?.toLowerCase()) {
			case 'positive':
				return (
					<svg
						className='w-3 h-3 mr-1.5'
						fill='currentColor'
						viewBox='0 0 20 20'>
						<path
							fillRule='evenodd'
							d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z'
							clipRule='evenodd'
						/>
					</svg>
				);
			case 'negative':
				return (
					<svg
						className='w-3 h-3 mr-1.5'
						fill='currentColor'
						viewBox='0 0 20 20'>
						<path
							fillRule='evenodd'
							d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z'
							clipRule='evenodd'
						/>
					</svg>
				);
			default:
				return (
					<svg
						className='w-3 h-3 mr-1.5'
						fill='currentColor'
						viewBox='0 0 20 20'>
						<path
							fillRule='evenodd'
							d='M10 18a8 8 0 100-16 8 8 0 000 12z'
							clipRule='evenodd'
						/>
					</svg>
				);
		}
	};

	return (
		<span className={getImpactStyles(impact)}>
			{getImpactIcon(impact)}
			{impact || 'Neutral'}
		</span>
	);
};

const NewsCard = ({ headline, index, portfolioStocks, analysis }) => {
	// Find analysis for this headline
	const headlineAnalysis = analysis?.find((item) => item.headline === headline);

	return (
		<div className='news-card group'>
			<div className='flex items-start gap-4'>
				<div className='number-badge bg-gradient-to-br from-secondary-100 to-secondary-200 text-secondary-700 group-hover:from-secondary-200 group-hover:to-secondary-300'>
					{index + 1}
				</div>
				<div className='flex-1'>
					<p className='text-neutral-800 font-semibold leading-relaxed mb-4 group-hover:text-neutral-900 transition-colors'>
						{headline}
					</p>

					{/* AI Analysis Section */}
					{headlineAnalysis &&
						headlineAnalysis.matches &&
						headlineAnalysis.matches.length > 0 && (
							<div className='mb-4 space-y-2'>
								{headlineAnalysis.matches.map((match, matchIndex) => (
									<div
										key={matchIndex}
										className='bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-xl p-3 border border-neutral-200'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-2'>
												<div className='w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center'>
													<span className='text-white font-bold text-xs'>
														{match.stock.slice(0, 2)}
													</span>
												</div>
												<span className='font-bold text-primary-700 text-sm'>
													{match.stock}
												</span>
											</div>
											<ImpactBadge impact={match.impact} />
										</div>
										<p className='text-neutral-600 text-sm mt-2 leading-relaxed'>
											{match.reason}
										</p>
									</div>
								))}
							</div>
						)}

					<div className='flex items-center gap-3 flex-wrap'>
						<span className='inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800 border border-secondary-300'>
							<svg
								className='w-3 h-3 mr-1.5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z'
								/>
							</svg>
							Portfolio Relevant
						</span>
						<span className='text-xs text-neutral-400'>•</span>
						<div className='flex items-center gap-2'>
							<div className='w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center'>
								<span className='text-white font-bold text-xs'>
									{portfolioStocks.length}
								</span>
							</div>
							<span className='text-xs text-neutral-600 font-medium'>
								stock{portfolioStocks.length === 1 ? '' : 's'} in portfolio
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const FilteredNews = ({ portfolio, filteredNews, loading, error }) => {
	const [analysis, setAnalysis] = useState([]);
	const [analysisLoading, setAnalysisLoading] = useState(false);
	const [analysisError, setAnalysisError] = useState(null);

	// Fetch AI analysis when filtered news changes
	useEffect(() => {
		const fetchAnalysis = async () => {
			if (
				!filteredNews ||
				filteredNews.length === 0 ||
				!portfolio ||
				portfolio.length === 0
			) {
				setAnalysis([]);
				return;
			}

			try {
				setAnalysisLoading(true);
				setAnalysisError(null);

				const response = await fetch(
					`${
						process.env.BACKEND_URL ||
						'https://smart-news-portfolio-insight.onrender.com'
					}/analyze`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							headlines: filteredNews,
							portfolio: portfolio,
						}),
					}
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setAnalysis(data.analysis || []);
			} catch (err) {
				console.error('Error fetching AI analysis:', err);
				setAnalysisError(err.message);
				setAnalysis([]);
			} finally {
				setAnalysisLoading(false);
			}
		};

		fetchAnalysis();
	}, [filteredNews, portfolio]);

	if (portfolio.length === 0) {
		return (
			<div className='section-card'>
				<div className='flex items-center gap-4 mb-6'>
					<div className='icon-wrapper bg-gradient-to-br from-secondary-100 to-secondary-200'>
						<svg
							className='w-6 h-6 text-secondary-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z'
							/>
						</svg>
					</div>
					<div>
						<h2 className='text-2xl font-bold gradient-text'>Portfolio News</h2>
						<p className='text-neutral-600 text-sm'>
							Personalized news with AI insights
						</p>
					</div>
				</div>
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
								d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
							/>
						</svg>
					</div>
					<h3 className='text-lg font-semibold text-neutral-800 mb-2'>
						Add stocks to your portfolio
					</h3>
					<p className='text-neutral-600 max-w-md mx-auto'>
						Get personalized news with AI-powered sentiment analysis for your
						holdings
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='section-card'>
			<div className='flex items-center gap-4 mb-8'>
				<div className='icon-wrapper bg-gradient-to-br from-secondary-100 to-secondary-200'>
					<svg
						className='w-6 h-6 text-secondary-600'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z'
						/>
					</svg>
				</div>
				<div>
					<h2 className='text-2xl font-bold gradient-text'>Portfolio News</h2>
					<p className='text-neutral-600 text-sm'>
						News relevant to your {portfolio.length} stock
						{portfolio.length === 1 ? '' : 's'} with AI insights
					</p>
				</div>
				{analysisLoading && (
					<div className='ml-auto'>
						<div className='flex items-center gap-2 text-accent-600'>
							<div className='w-4 h-4 border-2 border-accent-600 border-t-transparent rounded-full animate-spin'></div>
							<span className='text-sm font-medium'>Analyzing...</span>
						</div>
					</div>
				)}
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
						Failed to load portfolio news
					</h3>
					<p className='text-neutral-600 mb-6 max-w-md mx-auto'>{error}</p>
				</div>
			)}

			{analysisError && (
				<div className='mb-6 p-4 bg-gradient-to-r from-warning-50 to-warning-100 border border-warning-200 rounded-xl'>
					<div className='flex items-center gap-3'>
						<svg
							className='w-5 h-5 text-warning-600'
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
						<div>
							<p className='text-warning-800 font-medium'>
								AI Analysis Unavailable
							</p>
							<p className='text-warning-700 text-sm'>{analysisError}</p>
						</div>
					</div>
				</div>
			)}

			{!loading && !error && filteredNews.length === 0 && (
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
						No relevant news found
					</h3>
					<p className='text-neutral-600 max-w-md mx-auto'>
						There's no current news matching your portfolio stocks. Check back
						later for updates.
					</p>
				</div>
			)}

			{!loading && !error && filteredNews.length > 0 && (
				<div className='space-y-4'>
					{filteredNews.map((headline, index) => (
						<div
							key={index}
							className='animate-fade-in'
							style={{ animationDelay: `${index * 0.1}s` }}>
							<NewsCard
								headline={headline}
								index={index}
								portfolioStocks={portfolio}
								analysis={analysis}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FilteredNews;
