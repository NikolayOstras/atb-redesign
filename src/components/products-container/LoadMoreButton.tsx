import { ChevronDown } from '@/icons/ChevronDown';
import { Loader } from '../Loader';

interface LoadMoreButtonProps {
	loading: boolean;
	onClick: () => void;
}

export function LoadMoreButton({ loading, onClick }: LoadMoreButtonProps) {
	return (
		<div className="flex justify-center py-4">
			<button
				type="button"
				onClick={onClick}
				className="px-4 py-2 bg-cAccent text-cBg rounded-md hover:bg-cAccent-100 transition-colors"
				disabled={loading}
			>
				{loading ? (
					<Loader />
				) : (
					<div className="flex gap-2 items-center">
						Більше
						<ChevronDown className="animate-bounce text-xl" />
					</div>
				)}
			</button>
		</div>
	);
}
