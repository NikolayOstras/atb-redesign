import { useState } from 'react'
import { ChevronDown } from '../icons/ChevronDown'
import { TCategory } from '../services/fetchCategories'

interface MenuProps {
	categories: TCategory[] | null
}

export function Menu({ categories }: MenuProps) {
	const [openCategories, setOpenCategories] = useState<string[]>([])

	const toggleCategory = (categoryName: string) => {
		setOpenCategories(prev => {
			// If we're opening a new category and it's not already open
			if (!prev.includes(categoryName)) {
				// Close all other categories
				return [categoryName]
			} else {
				// Otherwise, just toggle as usual
				return prev.includes(categoryName)
					? prev.filter(name => name !== categoryName)
					: [...prev, categoryName]
			}
		})
	}

	return (
		<header className='fade'>
			<nav>
				<ul className='text-2xl font-semibold flex flex-col gap-4 xl:flex-row xl:flex-wrap xl:text-base'>
					{categories === null ? (
						<li>Loading...</li>
					) : (
						categories.map(category => (
							<li key={category.name} className=' xl:relative'>
								<button
									className='w-full px-2 py-3 flex gap-2 items-center hover:text-cAccent transition-colors'
									onClick={() => toggleCategory(category.name)}
								>
									{category.name}
									<ChevronDown
										className={`h-5 w-5 transition-transform ${
											openCategories.includes(category.name) ? 'rotate-180' : ''
										}`}
									/>
								</button>
								{openCategories.includes(category.name) && (
									<ul className='font-medium text-xl flex flex-col flex-wrap gap-3 fade xl:absolute top-11 xl:bg-cBg/75 backdrop-blur xl:z-10 xl:text-sm xl:shadow-sm xl:w-full  xl:min-w-52'>
										<li className='px-4 py-3 hover:text-cActive transition-colors xl:px-2'>
											<button>Всі товари</button>
										</li>
										{category.subcategories.map(item => (
											<li
												key={item}
												className='px-4 py-3 hover:text-cActive transition-colors xl:px-2'
											>
												<button className='capitalize text-nowrap'>
													{item}
												</button>
											</li>
										))}
									</ul>
								)}
							</li>
						))
					)}
				</ul>
			</nav>
		</header>
	)
}
