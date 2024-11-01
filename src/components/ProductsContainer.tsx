import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { DEFAULT_CATEGORY, DEFAULT_SUB_CATEGORY } from '../lib/const'
import {
	TProduct,
	fetchProductsByCategoryAndSubcategory,
} from '../services/fetchProducts'
import { Card } from './Card'
import { Loader } from './Loader'

export function ProductsContainer() {
	const {
		categoryId = DEFAULT_CATEGORY,
		subCategoryId = DEFAULT_SUB_CATEGORY,
	} = useParams()
	console.log(categoryId, subCategoryId)
	const [products, setProducts] = useState<TProduct[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadProducts = async () => {
			setLoading(true) // ensure loading is true when starting fetch
			try {
				const data = await fetchProductsByCategoryAndSubcategory(
					categoryId,
					subCategoryId
				)
				setProducts(data)
			} catch (error) {
				console.error('Error fetching products:', error)
				setError('Failed to load products. Please try again later.')
			} finally {
				setLoading(false)
			}
		}

		loadProducts()
	}, [categoryId, subCategoryId])

	if (loading) {
		return (
			<div className='flex items-center justify-center'>
				<Loader />
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex items-center justify-center'>
				<p>{error}</p>
			</div>
		)
	}

	if (products.length === 0) {
		return (
			<div className='flex items-center justify-center'>
				<p>No products available.</p>
			</div>
		)
	}

	return (
		<div className='grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-8 py-8'>
			{products.map(product => (
				<Card key={product.link} {...product} />
			))}
		</div>
	)
}
