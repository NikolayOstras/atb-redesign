import { useEffect, useState } from 'react'
import { ChevronDown } from '../icons/ChevronDown'
import { TCategory, fetchCategories } from '../services/fetchCategories'
import { translateCategoriesToUA } from '../utils/translateCategoriesToUA'
import { Loader } from './Loader'

export function Menu() {
	const [loading, setLoading] = useState(true)
	const [categories, setCategories] = useState<TCategory[]>([])
	const [openCategories, setOpenCategories] = useState<string[]>([])

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await fetchCategories()

				// console.log(data)
				setCategories(translateCategoriesToUA(data))
			} catch (error) {
				console.error('Error fetching categories:', error)
			} finally {
				setLoading(false)
			}
		}

		loadCategories()
	}, [])

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
		<header>
			{loading ? (
				<Loader />
			) : (
				<nav>
					<ul className='text-2xl font-semibold flex flex-col gap-4'>
						{categories.map(category => (
							<li key={category.name}>
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
									<ul className='font-medium text-xl flex flex-col gap-3 fade'>
										{category.subcategories.map(item => (
											<li
												key={item}
												className='px-4 py-3 hover:text-cActive transition-colors '
											>
												<button className='capitalize'>{item}</button>
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</nav>
			)}
		</header>
	)
}
