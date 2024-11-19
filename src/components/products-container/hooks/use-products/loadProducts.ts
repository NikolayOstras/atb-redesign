import { QueryDocumentSnapshot } from 'firebase/firestore'
import { fetchProductsByCategory } from '../../api/fetchProductsByCategory'
import { fetchProductsByCategoryAndSubcategory } from '../../api/fetchProductsByCategoryAndSubcategory'

export async function loadProducts(
	categoryId: string,
	subCategoryId?: string,
	lastDoc?: QueryDocumentSnapshot
) {
	if (!subCategoryId) {
		return await fetchProductsByCategory(categoryId, lastDoc)
	} else {
		return await fetchProductsByCategoryAndSubcategory(
			categoryId,
			subCategoryId,
			lastDoc
		)
	}
}
