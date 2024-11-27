import { Loader } from '@/components/Loader'
import { ProductsGrid } from '@/components/products-container/ProductsGrid'
import type { TProduct } from '@/components/products-container/types'
import { useFavoritesStore } from '@/store/favorites-store/store'
import { useEffect, useMemo, useState } from 'react'
import { fetchProductById } from './api/fetchProductById'

export function Home() {
	const { favorites } = useFavoritesStore()
	const [favoriteProducts, setFavoriteProducts] = useState<TProduct[]>([])
	const [loading, setLoading] = useState(true)

	// Мемоизируем результат фильтрации и загрузки
	const fetchProducts = useMemo(() => {
		return async () => {
			if (favorites.length === 0) {
				setFavoriteProducts([])
				setLoading(false)
				return
			}

			setLoading(true)
			const products = await Promise.all(
				favorites.map(async id => {
					const product = await fetchProductById(id)
					return product
				})
			)

			setFavoriteProducts(products.filter(Boolean) as TProduct[])
			setLoading(false)
		}
	}, [favorites])

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	if (loading) {
		return (
			<div className='flex justify-center'>
				<Loader />
			</div>
		)
	}

	if (favoriteProducts.length === 0) {
		return <div>Додайте продукти у вибране щоб побачити тут</div>
	}

	return (
		<>
			<h1 className='text-3xl font-semibold text-cInfo'>
				Ваші вибрані продукти:
			</h1>
			<ProductsGrid products={favoriteProducts} />
		</>
	)
}
