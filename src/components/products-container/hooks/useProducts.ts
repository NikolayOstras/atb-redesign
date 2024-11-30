import { useProductsStore } from '@/store/products-store/store'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function useProducts() {
	const { categoryId, subCategoryId } = useParams<{
		categoryId: string
		subCategoryId?: string
	}>()

	const {
		products,
		loading,
		error,
		fetchInitialProducts,
		loadMore,
		reset,
		totalCount,
	} = useProductsStore()

	useEffect(() => {
		if (categoryId) {
			fetchInitialProducts(categoryId, subCategoryId)
		}

		return () => {
			reset()
		}
	}, [categoryId, subCategoryId])

	return {
		products,
		loading,
		error,
		totalCount,
		loadMore: () => loadMore(categoryId!, subCategoryId),
	}
}
