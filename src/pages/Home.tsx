import { LegalNotice } from '@/LegalNotice'
import { CategoriesCircles } from '@/components/CategoriesCircles'
import { ProductsGrid } from '@/components/products-container/ProductsGrid'
import { useFavoritesStore } from '@/store/favorites-store/store'
import { ScrollRestoration } from 'react-router-dom'

export function Home() {
	const { favorites } = useFavoritesStore()
	console.log(favorites)

	if (!favorites.length) {
		return (
			<>
				<ScrollRestoration />
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
			<ScrollRestoration />
			<h1 className='text-3xl font-semibold text-cAccent'>
				Ваші вибрані продукти:
			</h1>
			<ProductsGrid products={favorites} />
			<CategoriesCircles />
			<LegalNotice />
		</>
	)
}

export default Home
