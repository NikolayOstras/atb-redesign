import { Loader } from '../Loader'

interface LoadMoreButtonProps {
	loading: boolean
	onClick: () => void
}

export function LoadMoreButton({ loading, onClick }: LoadMoreButtonProps) {
	return (
		<div className='flex justify-center py-4'>
			<button
				onClick={onClick}
				className='px-4 py-2 bg-cAccent text-cBg rounded-md hover:bg-cAccent-100 transition-colors'
				disabled={loading}
			>
				{loading ? <Loader /> : 'Load More'}
			</button>
		</div>
	)
}
