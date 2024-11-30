import type { TPriceHistory } from '@/components/products-container/types'
import { X } from '@/icons/X'
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { usePriceChartData } from './usePriceChartData'

interface PriceHistoryProps {
	priceHistory: TPriceHistory[]
	showChart: boolean
	onClose: () => void
}

export function PriceHistory({
	priceHistory,
	showChart,
	onClose,
}: PriceHistoryProps) {
	const { chartData, yDomain } = usePriceChartData(priceHistory)
	return (
		showChart && (
			<div
				className='fixed bg-cMain-50/50 inset-0 flex flex-col items-center justify-center z-50 text-xs fade'
				onClick={onClose}
				onKeyUp={e => {
					if (e.key === 'Escape') onClose()
				}}
			>
				<div
					className='bg-cBg-50/75 dark:bg-cMain backdrop-blur-lg rounded-lg shadow-lg p-8 pt-12 fade w-[90%] max-w-screen-sm'
					onClick={e => e.stopPropagation()}
					onKeyUp={e => {
						if (e.key === 'Escape') onClose()
					}}
				>
					<button
						type='button'
						onClick={() => onClose()}
						className='absolute right-1 top-1 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200'
						aria-label='Close chart'
					>
						<X />
					</button>
					<ResponsiveContainer width='100%' height={250}>
						<LineChart data={chartData}>
							<XAxis dataKey='date' />
							<YAxis domain={yDomain} />
							<Tooltip />
							<Line type='natural' dataKey='price' stroke='#00ac6a' />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		)
	)
}
