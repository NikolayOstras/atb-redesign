import { ReactNode, useMemo, useState } from 'react'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { ArrowRight } from '../icons/ArrowRight'
import { Chart } from '../icons/Chart'
import { X } from '../icons/X'
import { TProduct } from '../services/fetchProducts'

export function Card({ title, img, price, link, priceHistory }: TProduct) {
	const currentPrice = price
	const previousPrice =
		priceHistory.length > 1
			? priceHistory[priceHistory.length - 2]?.price
			: null
	const [showChart, setShowChart] = useState(false)

	let priceTrendIcon: ReactNode = null
	if (previousPrice !== null && currentPrice !== null) {
		if (currentPrice > previousPrice) {
			priceTrendIcon = <span className='triangle _up'></span>
		} else if (currentPrice < previousPrice) {
			priceTrendIcon = <span className='triangle _down'></span>
		}
	}
	const chartData = useMemo(
		() =>
			priceHistory.map(item => ({
				date: item.timestamp.toDate().toLocaleDateString(),
				price: item.price,
			})),
		[priceHistory]
	)

	return (
		<article className='bg-cBg-50 flex flex-col gap-2 p-8 rounded-xl shadow dark:bg-cMain-50 relative'>
			<img
				src={img}
				alt={title}
				width={200}
				height={200}
				className='object-cover rounded-xl'
			/>
			<p>{title}</p>
			<div className='flex justify-between mt-auto'>
				<div className='text-sm xl:text-lg font-semibold flex justify-between flex-wrap items-center gap-1'>
					{price} {priceTrendIcon}
				</div>
				{priceHistory.length > 1 && (
					<button
						className='text-cAccent hover:text-cAccent-50 transition-colors'
						onClick={() => {
							setShowChart(!showChart)
							console.log(
								'Current Price:',
								currentPrice,
								'Previous Price:',
								previousPrice
							)
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
				<div
					className='fixed bg-cMain-50/50 inset-0 flex flex-col items-center justify-center z-50 text-xs fade'
					onClick={e => {
						if (e.target === e.currentTarget) {
							setShowChart(false)
						}
					}}
				>
					<div
						className='bg-cBg-50/75 dark:bg-cMain backdrop-blur-lg rounded-lg shadow-lg p-8 pt-12 fade'
						onClick={e => e.stopPropagation()}
					>
						<button
							onClick={() => setShowChart(false)}
							className='absolute right-1 top-1 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200'
							aria-label='Close chart'
						>
							<X />
						</button>
						<LineChart width={375} height={250} data={chartData}>
							<XAxis dataKey='date' />
							<YAxis />
							<CartesianGrid stroke='#eeeeee' />
							<Tooltip />
							<Legend />
							<Line type='natural' dataKey='price' stroke='#00ac6a' />
						</LineChart>
					</div>
				</div>
			)}
		</article>
	)
}
