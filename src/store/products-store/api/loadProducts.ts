import { db } from '@/lib/firebase'
import { LIMIT } from '@/utils/const'
import {
	collection,
	doc,
	getDocs,
	limit,
	query,
	startAfter,
	where,
	type QueryDocumentSnapshot,
} from 'firebase/firestore'

export const loadProducts = async (
	categoryId: string,
	subCategoryId?: string,
	lastDoc?: QueryDocumentSnapshot
): Promise<{
	products: any[]
	lastDoc: QueryDocumentSnapshot | null
	count: number
}> => {
	try {
		const productsCollection = collection(db, 'products')
		let productsQuery = null
		let count = 0
		// Create the category and subcategory references
		const categoryRef = doc(db, 'categories', categoryId)

		// Add subcategory filter if provided
		if (subCategoryId) {
			const subCategoryRef = doc(db, 'subcategories', subCategoryId)
			productsQuery = query(
				productsCollection,
				where('subcategory', '==', subCategoryRef)
			)
			const snapshot = await getDocs(productsQuery)
			count = snapshot.size
		} else {
			productsQuery = query(
				productsCollection,
				where('category', '==', categoryRef)
			)
			const snapshot = await getDocs(productsQuery)
			count = snapshot.size
		}

		// Handle pagination if lastDoc is provided
		if (lastDoc) {
			productsQuery = query(productsQuery, startAfter(lastDoc), limit(LIMIT))
		} else {
			productsQuery = query(productsQuery, limit(LIMIT))
		}

		// Fetch products
		const productsSnapshot = await getDocs(productsQuery)
		// Map products to an array
		const products = productsSnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}))

		// Get the last document for pagination
		const newLastDoc =
			productsSnapshot.docs[productsSnapshot.docs?.length - 1] || null

		return { products, lastDoc: newLastDoc, count }
	} catch (error) {
		console.error('Error loading products:', error)
		throw error
	}
}
