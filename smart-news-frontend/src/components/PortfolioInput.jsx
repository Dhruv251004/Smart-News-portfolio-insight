import { useState } from 'react';

const PortfolioInput = ({
	portfolio,
	setPortfolio,
	onGetInsights,
	isLoading,
}) => {
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState('');

	const handleAddStock = (e) => {
		e.preventDefault();
		const stock = inputValue.trim().toUpperCase();

		if (!stock) {
			setError('Please enter a stock symbol');
			return;
		}

		if (portfolio.includes(stock)) {
			setError('Stock already added to portfolio');
			return;
		}

		if (stock.length > 20) {
			setError('Stock symbol too long');
			return;
		}

		setPortfolio([...portfolio, stock]);
		localStorage.setItem('portfolio', JSON.stringify([...portfolio, stock]));
		// Reset input and error state
		setInputValue('');
		setError('');
	};

	const handleRemoveStock = (stockToRemove) => {
		setPortfolio(portfolio.filter((stock) => stock !== stockToRemove));
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
		if (error) setError('');
	};

	return (
		<div className='section-card'>
			<div className='flex items-center gap-4 mb-6'>
				<div className='icon-wrapper bg-gradient-to-br from-primary-100 to-primary-200'>
					<svg
						className='w-6 h-6 text-primary-600'
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
				<div>
					<h2 className='text-2xl font-bold gradient-text'>Your Portfolio</h2>
					<p className='text-neutral-600 text-sm'>
						Build your investment portfolio
					</p>
				</div>
			</div>

			<form
				onSubmit={handleAddStock}
				className='mb-6'>
				<div className='flex gap-3'>
					<div className='flex-1'>
						<input
							type='text'
							value={inputValue}
							onChange={handleInputChange}
							placeholder='Enter stock symbol (e.g., TATAMOTORS, INFY)'
							className='input-field'
							disabled={isLoading}
						/>
						{error && (
							<p className='text-error-600 text-sm mt-2 flex items-center gap-2'>
								<svg
									className='w-4 h-4'
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
								{error}
							</p>
						)}
					</div>
					<button
						type='submit'
						disabled={isLoading}
						className='btn-primary flex items-center justify-center px-4 py-2'>
						<svg
							className='w-5 h-5 mr-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 6v6m0 0v6m0-6h6m-6 0H6'
							/>
						</svg>
						Add
					</button>
				</div>
			</form>

			{portfolio.length > 0 && (
				<div className='mb-6'>
					<div className='flex flex-wrap gap-3'>
						{portfolio.map((stock, index) => (
							<div
								key={stock}
								className='stock-chip animate-scale-in'
								style={{ animationDelay: `${index * 0.1}s` }}>
								<span className='font-bold'>{stock}</span>
								<button
									onClick={() => handleRemoveStock(stock)}
									className='stock-chip-remove'
									disabled={isLoading}>
									<svg
										className='w-4 h-4'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M6 18L18 6M6 6l12 12'
										/>
									</svg>
								</button>
							</div>
						))}
					</div>
					<div className='mt-4 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200'>
						<div className='flex items-center gap-3'>
							<div className='w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center'>
								<span className='text-white font-bold text-sm'>
									{portfolio.length}
								</span>
							</div>
							<div>
								<p className='font-semibold text-primary-800'>
									{portfolio.length} stock{portfolio.length === 1 ? '' : 's'} in
									your portfolio
								</p>
								<p className='text-primary-600 text-sm'>
									Ready for intelligent analysis
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<button
				onClick={onGetInsights}
				disabled={portfolio.length === 0 || isLoading}
				className='w-full btn-success text-lg py-4 '>
				{isLoading ? (
					<div className='flex items-center justify-center gap-3'>
						<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
						<span>Analyzing Portfolio...</span>
						<div className='flex space-x-1'>
							<div className='w-2 h-2 bg-white rounded-full animate-bounce'></div>
							<div
								className='w-2 h-2 bg-white rounded-full animate-bounce'
								style={{ animationDelay: '0.1s' }}></div>
							<div
								className='w-2 h-2 bg-white rounded-full animate-bounce'
								style={{ animationDelay: '0.2s' }}></div>
						</div>
					</div>
				) : (
					<div className='flex items-center justify-center gap-3'>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
							/>
						</svg>
						<span>Get Portfolio Insights</span>
						<svg
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M13 7l5 5m0 0l-5 5m5-5H6'
							/>
						</svg>
					</div>
				)}
			</button>

			{portfolio.length === 0 && (
				<div className='mt-6 p-6 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-xl border border-neutral-200'>
					<div className='text-center'>
						<div className='w-12 h-12 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center mx-auto mb-3'>
							<svg
								className='w-6 h-6 text-neutral-500'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 6v6m0 0v6m0-6h6m-6 0H6'
								/>
							</svg>
						</div>
						<p className='text-neutral-600 font-medium mb-1'>
							Start Building Your Portfolio
						</p>
						<p className='text-neutral-500 text-sm'>
							Add stock symbols to get personalized insights and AI-powered
							analysis
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default PortfolioInput;
