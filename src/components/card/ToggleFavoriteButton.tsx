import { Heart } from '@/icons/Heart'
interface ToggleFavoriteButtonProps {
	onClick: () => void
	isInFavorites: boolean
}

export function ToggleFavoriteButton({
	onClick,
	isInFavorites,
}: ToggleFavoriteButtonProps) {
	return (
		<button
			className={
				'text-cAccent bg-cBg dark:bg-cMain w-10 h-10 rounded-full flex items-center justify-center absolute top-4 right-4 hover:scale-110 text-2xl transition-all '
			}
			onClick={onClick}
			aria-label={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
		>
			{isInFavorites ? (
				<Heart className='fill-cActive-50 stroke-cActive' />
			) : (
				<Heart className='stroke-cAccent' />
			)}
		</button>
	)
}
