import { ReactNode, useState } from 'react'

import { ArrowRight } from '../../icons/ArrowRight'
import { Chart } from '../../icons/Chart'
import { TriangleDown } from '../../icons/TriangleDown'
import { TriangleUp } from '../../icons/TriangleUp'
import { TProduct } from '../../utils/types'
import { PriceHistory } from './price-history/PriceHistory'

export interface ICardProps {
	title: string
	img: string
	price: number
	link: string
	priceHistory: TProduct['priceHistory']
}

export function Card({ title, img, price, link, priceHistory }: ICardProps) {
	const currentPrice = price
	const previousPrice =
		priceHistory.length > 1
			? priceHistory[priceHistory.length - 2]?.price
			: null
	const [showChart, setShowChart] = useState(false)

	let priceTrendIcon: ReactNode = null
	if (previousPrice !== null && currentPrice !== null) {
		if (currentPrice > previousPrice) {
			priceTrendIcon = <TriangleUp />
		} else if (currentPrice < previousPrice) {
			priceTrendIcon = <TriangleDown />
		}
	}

	return (
		<article className='bg-cBg-50 flex flex-col gap-2 p-8 rounded-xl shadow dark:bg-cMain-50 relative'>
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
					{price} {priceTrendIcon}
				</div>
				{priceHistory.length > 1 && (
					<button
						className='text-cAccent hover:text-cAccent-50 transition-colors'
						onClick={() => {
							setShowChart(!showChart)
						}}
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
