import { QueryDocumentSnapshot } from 'firebase/firestore'
import { fetchCartProducts } from '../../services/fetchCartProducts'
import { fetchProductsByCategory } from '../../services/fetchProductsByCategory'
import { fetchProductsByCategoryAndSubcategory } from '../../services/fetchProductsByCategoryAndSubcategory'
import { ICardProps } from '../card/Card'

export const loadProductsByCategory = async (
	categoryId: string,
	subCategoryId: string | undefined,
	setProducts: React.Dispatch<React.SetStateAction<ICardProps[]>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	setLastDoc: React.Dispatch<React.SetStateAction<QueryDocumentSnapshot | null>>
) => {
	setLoading(true)
	setError(null)
	setProducts([])
	setLastDoc(null)

	try {
		const data = subCategoryId
			? await fetchProductsByCategoryAndSubcategory(categoryId, subCategoryId)
			: await fetchProductsByCategory(categoryId)

		setProducts(data.products)
		setLastDoc(data.lastDoc ?? null)
	} catch (error) {
		setError('Failed to load products. Please try again later.')
	} finally {
		setLoading(false)
	}
}

export const loadCartProducts = async (
	setProducts: React.Dispatch<React.SetStateAction<ICardProps[]>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	setLastDoc: React.Dispatch<React.SetStateAction<QueryDocumentSnapshot | null>>
) => {
	setLoading(true)
	setError(null)
	setProducts([])
	setLastDoc(null)

	try {
		const products = await fetchCartProducts()
		setProducts(products)
	} catch (error) {
		setError('Failed to load cart products. Please try again later.')
	} finally {
		setLoading(false)
	}
}

export const loadMoreProducts = async (
	categoryId: string | undefined,
	subCategoryId: string | undefined,
	lastDoc: QueryDocumentSnapshot | null,
	setProducts: React.Dispatch<React.SetStateAction<ICardProps[]>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	setLastDoc: React.Dispatch<React.SetStateAction<QueryDocumentSnapshot | null>>
) => {
	if (!categoryId || !lastDoc) return

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
		setError('Failed to load more products. Please try again later.')
	} finally {
		setLoading(false)
	}
}
