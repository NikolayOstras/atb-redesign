import { useState } from 'react'
import { TCategory } from '../../../services/fetchCategories'
import { MenuItem } from './MenuItem'

interface MenuProps {
	categories: TCategory[] | null
	onClose: () => void
}

export function Menu({ categories, onClose }: MenuProps) {
	const [openCategories, setOpenCategories] = useState<string[]>([])

	const toggleCategory = (categoryName: string) => {
		setOpenCategories(prev =>
			prev.includes(categoryName)
				? prev.filter(name => name !== categoryName)
				: [categoryName]
		)
	}

	return (
		<div className='fade'>
			<nav className='overflow-y-auto h-[90vh] xl:h-auto xl:overflow-y-visible scrollbar-gutter-stable scroll-small py-4 xl:py-0'>
				<ul className='text-xl xl:font-semibold flex flex-col items-center gap-1 xl:gap-4 xl:flex-row xl:flex-wrap xl:text-base'>
					{categories === null ? (
						<li>Loading...</li>
					) : (
						categories.map(category => (
							<MenuItem
								key={category.id}
								category={category}
								isOpen={openCategories.includes(category.title)}
								onToggle={() => toggleCategory(category.title)}
								onClose={onClose}
							/>
						))
					)}
				</ul>
			</nav>
		</div>
	)
}
