import { DocumentData, collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase' // Assuming you have a firebaseConfig.ts file

export type TProduct = {
	img: string
	link: string
	price: string
	prices: { number: number; timestamp: string }[]
	title: string
}

/**
 * Fetches products from Firestore based on the provided category and subcategory.
 *
 * @param {string} category - The category of the products.
 * @param {string} subcategory - The subcategory of the products.
 * @returns {Promise<TProduct[]>} A promise that resolves to an array of Product objects.
 */
export async function fetchProductsByCategoryAndSubcategory(
	category: string,
	subcategory: string
): Promise<TProduct[]> {
	try {
		const productsCollection = collection(
			db,
			'categories',
			category,
			'subcategories',
			subcategory,
			'products'
		)
		const snapshot = await getDocs(productsCollection)
		const products = snapshot.docs.map(doc => {
			const data = doc.data() as DocumentData
			return {
				img: data.img,
				link: data.link,
				price: data.price,
				prices: data.prices,
				title: data.title,
			}
		})
		return products
	} catch (error) {
		console.error('Error getting products by category:', error)
		return []
	}
}
