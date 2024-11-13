import { QueryDocumentSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ICardProps } from '../card/Card'
import {
	loadCartProducts,
	loadMoreProducts,
	loadProductsByCategory,
} from './product-functions'

interface UseProductsResult {
	products: ICardProps[]
	loading: boolean
	error: string | null
	lastDoc: QueryDocumentSnapshot | null
	loadMore: () => Promise<void>
}

export function useProducts(): UseProductsResult {
	const { pathname } = useLocation()
	const { categoryId, subCategoryId } = useParams()
	const [products, setProducts] = useState<ICardProps[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null)

	useEffect(() => {
		if (pathname === '/') {
			loadCartProducts(setProducts, setLoading, setError, setLastDoc)
		} else if (categoryId) {
			loadProductsByCategory(
				categoryId,
				subCategoryId,
				setProducts,
				setLoading,
				setError,
				setLastDoc
			)
		}
	}, [pathname, categoryId, subCategoryId])

	const loadMore = async () => {
		await loadMoreProducts(
			categoryId,
			subCategoryId,
			lastDoc,
			setProducts,
			setLoading,
			setError,
			setLastDoc
		)
	}

	return { products, loading, error, lastDoc, loadMore }
}
