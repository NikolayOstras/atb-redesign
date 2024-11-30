import { LegalNotice } from '@/LegalNotice'
import { ProductsGrid } from '@/components/products-container/ProductsGrid'
import useCategoriesStore from '@/store/categories-store/store'
import { useFavoritesStore } from '@/store/favorites-store/store'
import { Link } from 'react-router-dom'

export function Home() {
	const { favorites } = useFavoritesStore()
	const { categories } = useCategoriesStore()

	const CategoriesCircles = () => {
		const maxAmount = Math.max(...categories.map(cat => cat.amount))
		const minSize = 100 // Minimum size in pixels
		const maxSize = 200 // Maximum size in pixels
		const minFontSize = 14 // Minimum font size in pixels
		const maxFontSize = 24 // Maximum font size in pixels

		const calculateSize = (amount: number) => {
			const size = (amount / maxAmount) * (maxSize - minSize) + minSize
			return `${size}px`
		}

		const calculateFontSize = (amount: number) => {
			const fontSize =
				(amount / maxAmount) * (maxFontSize - minFontSize) + minFontSize
			return `${fontSize}px`
		}

		return (
			<div className='flex flex-wrap gap-8 mb-8'>
				{categories.map(category => {
					const size = calculateSize(category.amount)
					const fontSize = calculateFontSize(category.amount)
					return (
						<div
							key={category.id}
							className='flex items-center justify-center rounded-full bg-cInfo hover:bg-cInfo-50 transition-colors p-6'
							style={{
								width: size,
								height: size,
							}}
						>
							<Link
								to={`/category/${category.id}`}
								className='text-center flex flex-col'
								style={{ fontSize }}
							>
								{category.title}
								<span
									className='font-semibold mt-1'
									style={{
										fontSize: `${parseFloat(fontSize) * 0.7}px`,
									}}
								>
									({category.amount})
								</span>
							</Link>
						</div>
					)
				})}
			</div>
		)
	}

	if (favorites.length === 0) {
		return (
			<>
				<div className='my-4 font-semibold'>
					Додайте продукти у вибране щоб побачити тут
				</div>
				<CategoriesCircles />
				<LegalNotice />
			</>
		)
	}

	return (
		<>
			<ProductsGrid products={favorites} />
			<CategoriesCircles />
			<h1 className='text-3xl font-semibold text-cInfo'>
				Ваші вибрані продукти:
			</h1>
			<LegalNotice />
		</>
	)
}

export default Home
