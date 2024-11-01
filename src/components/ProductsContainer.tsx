import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { QueryDocumentSnapshot } from 'firebase/firestore'
import { DEFAULT_CATEGORY } from '../lib/const'
import {
	TProduct,
	fetchProductsByCategory,
	fetchProductsByCategoryAndSubcategory,
} from '../services/fetchProducts'
import { Card } from './Card'
import { Loader } from './Loader'

export function ProductsContainer() {
	const { categoryId = DEFAULT_CATEGORY, subCategoryId } = useParams()

	const [products, setProducts] = useState<TProduct[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null)

	const handleLoadMore = async () => {
		if (loading || !lastDoc) return

		setLoading(true)
		setError(null)

		try {
			const data = subCategoryId
				? await fetchProductsByCategoryAndSubcategory(
						categoryId,
						subCategoryId,
						lastDoc
				  )
				: await fetchProductsByCategory(categoryId, lastDoc)

			setProducts(prevProducts => [...prevProducts, ...data.products])
			setLastDoc(data.lastDoc ?? null)
		} catch (error) {
			console.error('Error fetching more products:', error)
			setError('Failed to load more products. Please try again later.')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const loadProducts = async () => {
			setLoading(true)
			setError(null)
			setLastDoc(null) // Reset lastDoc when category/subcategory changes
			setProducts([])

			try {
				const data = subCategoryId
					? await fetchProductsByCategoryAndSubcategory(
							categoryId,
							subCategoryId
					  )
					: await fetchProductsByCategory(categoryId)

				setProducts(data.products)
				setLastDoc(data.lastDoc ?? null) // Provide a default value of null
			} catch (error) {
				console.error('Error fetching products:', error)
				setError('Failed to load products. Please try again later.')
			} finally {
				setLoading(false)
			}
		}

		loadProducts()
	}, [categoryId, subCategoryId])

	if (loading && products.length === 0) {
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
		<>
			<div className='grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-8 py-8'>
				{products.map(product => (
					<Card key={product.link} {...product} />
				))}
			</div>
			{lastDoc && (
				<div className='flex justify-center py-4'>
					<button
						onClick={handleLoadMore}
						className='px-4 py-2 bg-cAccent text-cBg rounded-md hover:bg-cAccent-100 transition-colors'
						disabled={loading}
					>
						{loading ? <Loader /> : 'Load More'}
					</button>
				</div>
			)}
		</>
	)
}
