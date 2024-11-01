import {
	DocumentReference,
	collection,
	doc,
	getDocs,
	query,
	where,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export type TProduct = {
	img: string
	link: string
	price: number
	id: string
	prices: { price: number; timestamp: string }[]
	title: string
	category: DocumentReference
	subcategory: DocumentReference
}

/**
 * Fetches products from Firestore based on the provided category and subcategory.
 *
 * @param {string} categoryId - The ID of the category.
 * @param {string} subcategoryId - The ID of the subcategory.
 * @returns {Promise<TProduct[]>} A promise that resolves to an array of Product objects.
 */
export async function fetchProductsByCategoryAndSubcategory(
	categoryId: string,
	subcategoryId: string
): Promise<TProduct[]> {
	try {
		const productsCollection = collection(db, 'products')

		// Get document references for category and subcategory
		const categoryRef = doc(collection(db, 'categories'), categoryId)
		const subcategoryRef = doc(collection(db, 'subcategories'), subcategoryId)

		const productsQuery = query(
			productsCollection,
			where('category', '==', categoryRef),
			where('subcategory', '==', subcategoryRef)
		)

		const querySnapshot = await getDocs(productsQuery)
		const products = querySnapshot.docs.map(doc => ({
			id: doc.id,
			img: doc.data().img,
			link: doc.data().link,
			price: doc.data().price,
			prices: doc.data().prices || [],
			title: doc.data().title,
			category: doc.data().category,
			subcategory: doc.data().subcategory,
		}))

		console.log(products)
		return products
	} catch (error) {
		console.error('Error getting products by category and subcategory:', error)
		return []
	}
}
