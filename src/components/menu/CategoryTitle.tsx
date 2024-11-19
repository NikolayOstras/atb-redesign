import { ChevronDown } from '@/icons/ChevronDown'
import { TCategory } from '@/store/categories-store/types'
import { SubcategoryList } from './SubcategoryList'

interface ICategoryTitle {
	category: TCategory
	isOpen: boolean
	onToggle: () => void
	onClose: () => void
}

export function CategoryTitle({
	category,
	isOpen,
	onToggle,
	onClose,
}: ICategoryTitle) {
	return (
		<li className='xl:relative w-full xl:w-auto'>
			<button
				className='w-full px-2 py-3 flex gap-2 items-center justify-between hover:text-cAccent transition-colors'
				onClick={onToggle}
			>
				{category.title}
				<ChevronDown
					className={`h-5 w-5 transition-transform ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>
			{isOpen && category.subcategories?.length > 0 && (
				<SubcategoryList category={category} onClose={onClose} />
			)}
		</li>
	)
}
