import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from '../icons/ChevronDown'
import { TCategory } from '../services/fetchCategories'

interface MenuProps {
	categories: TCategory[] | null
}

export function Menu({ categories }: MenuProps) {
	console.log(categories)
	const [openCategories, setOpenCategories] = useState<string[]>([])

	const toggleCategory = (categoryName: string) => {
		setOpenCategories(prev =>
			prev.includes(categoryName)
				? prev.filter(name => name !== categoryName)
				: [categoryName]
		)
	}

	return (
		<header className='fade'>
			<nav>
				<ul className='text-2xl font-semibold flex flex-col gap-4 xl:flex-row xl:flex-wrap xl:text-base'>
					{categories === null ? (
						<li>Loading...</li>
					) : (
						categories.map(category => (
							<li key={category.id} className='xl:relative'>
								<button
									className='w-full px-2 py-3 flex gap-2 items-center hover:text-cAccent transition-colors'
									onClick={() => toggleCategory(category.title)}
								>
									{category.title}
									<ChevronDown
										className={`h-5 w-5 transition-transform ${
											openCategories.includes(category.title)
												? 'rotate-180'
												: ''
										}`}
									/>
								</button>
								{openCategories.includes(category.title) &&
									category.subcategories?.length > 0 && (
										<ul
											className='font-medium text-xl flex flex-col gap-3 fade xl:absolute top-12 xl:bg-cBg/75 backdrop-blur xl:z-10 xl:text-sm xl:shadow-sm xl:w-full xl:min-w-52 xl:max-h-80 xl:overflow-y-auto [&::-webkit-scrollbar]:w-2
										[&::-webkit-scrollbar-track]:bg-cBg-50
										[&::-webkit-scrollbar-thumb]:bg-cAccent [&::-webkit-scrollbar-thumb]:rounded-lg'
										>
											<li
												key={`${category.id}-all`}
												className='px-4 py-3 hover:text-cActive transition-colors xl:px-2'
											>
												<Link
													to={`/category/${category.id}`}
													className='capitalize xl:text-base'
												>
													Всі товари
													<span className='ml-2 text-cInfo'>
														(
														{category.subcategories.reduce(
															(sum, item) => sum + item.amount,
															0
														)}
														)
													</span>
												</Link>
											</li>
											{category.subcategories.map(item => (
												<li
													key={item.id} // Ensure unique key here
													className='px-4 py-3 hover:text-cActive transition-colors xl:px-2'
												>
													<Link
														to={`/category/${category.id}/${item.id}`}
														className='capitalize text-nowrap'
													>
														{item.title}
														<span className='ml-2 text-cInfo'>
															{item.amount}
														</span>
													</Link>
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
