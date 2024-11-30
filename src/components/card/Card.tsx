import { ArrowRight } from '@/icons/ArrowRight'
import { Chart } from '@/icons/Chart'
import { TriangleDown } from '@/icons/TriangleDown'
import { TriangleUp } from '@/icons/TriangleUp'
import { useFavoritesStore } from '@/store/favorites-store/store'
import { useState } from 'react'
import type { TProduct } from '../products-container/types'
import { ToggleFavoriteButton } from './ToggleFavoriteButton'
import { PriceHistory } from './price-history/PriceHistory'

export function Card(product: TProduct) {
	const { title, img, price, link, priceHistory, id } = product
	const { toggleFavorite, isFavorite } = useFavoritesStore()
	const currentPrice = Number(price)
	const previousPrice =
		priceHistory.length > 1
			? Number(priceHistory[priceHistory.length - 2]?.price)
			: 0
	const priceDifferencePercentage =
		previousPrice !== 0
			? (((currentPrice - previousPrice) / previousPrice) * 100).toFixed(2)
			: null
	const [showChart, setShowChart] = useState(false)
	let position = ''
	currentPrice > previousPrice ? (position = 'up') : (position = 'down')

	return (
		<article className='bg-cBg-50 flex flex-col gap-2 p-8 rounded-xl shadow dark:bg-cMain-50 relative'>
			<ToggleFavoriteButton
				onClick={() => toggleFavorite(product)}
				isInFavorites={isFavorite(id)}
			/>
			<img
				src={img}
				alt={title}
				width={200}
				height={200}
				className='object-cover rounded-xl mx-auto'
			/>
			<p className='text-center font-semibold'>{title}</p>
			<div className='flex justify-between mt-auto'>
				<div className='text-sm xl:text-lg font-semibold flex justify-between flex-wrap items-center gap-1'>
					{price}
					{priceDifferencePercentage !== '0.00' && position === 'down' ? (
						<div className='flex items-center ml-2 font-base'>
							<span className='text-xs text-cActive'>
								{priceDifferencePercentage}
							</span>
							<TriangleDown />
						</div>
					) : priceDifferencePercentage !== '0.00' && position === 'up' ? (
						<div className='flex items-center ml-2 font-base'>
							{priceDifferencePercentage && (
								<span className='text-xs text-cAccent'>
									{priceDifferencePercentage}
								</span>
							)}
							<TriangleUp />
						</div>
					) : null}
				</div>
				{priceHistory.length > 1 && (
					<button
						type='button'
						className='text-cAccent hover:text-cAccent-50 transition-colors'
						onClick={() => setShowChart(!showChart)}
						aria-label='Toggle price chart'
					>
						<Chart />
					</button>
				)}
				<a
					href={link}
					className='text-cInfo p-2 hover:text-cInfo-100 transition-colors'
					target='_blank'
					rel='noreferrer'
					aria-label='Product link'
				>
					<ArrowRight />
				</a>
			</div>
			{showChart && (
				<PriceHistory
					priceHistory={priceHistory}
					showChart={showChart}
					onClose={() => setShowChart(false)}
				/>
			)}
		</article>
	)
}
