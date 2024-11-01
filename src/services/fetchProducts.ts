import {
	DocumentReference,
	QueryDocumentSnapshot,
	collection,
	doc,
	getDocs,
	limit,
	query,
	startAfter,
	where,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const LIMIT = 16

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
 * Fetches products from Firestore based on the provided category and subcategory, with pagination.
 *
 * @param {string} categoryId - The ID of the category.
 * @param {string} subcategoryId - The ID of the subcategory.
 * @param {QueryDocumentSnapshot} [lastDoc] - The last document from the previous fetch for pagination.
 * @returns {Promise<{ products: TProduct[], lastDoc?: QueryDocumentSnapshot }>} A promise that resolves to an object containing an array of Product objects and optionally the last document for further pagination.
 */
export async function fetchProductsByCategoryAndSubcategory(
	categoryId: string,
	subcategoryId: string,
	lastDoc?: QueryDocumentSnapshot
): Promise<{ products: TProduct[]; lastDoc?: QueryDocumentSnapshot }> {
	try {
		const productsCollection = collection(db, 'products')

		// Get document references for category and subcategory
		const categoryRef = doc(collection(db, 'categories'), categoryId)
		const subcategoryRef = doc(collection(db, 'subcategories'), subcategoryId)

		let productsQuery = query(
			productsCollection,
			where('category', '==', categoryRef),
			where('subcategory', '==', subcategoryRef),
			limit(LIMIT)
		)

		if (lastDoc) {
			productsQuery = query(productsQuery, startAfter(lastDoc))
		}

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

		return {
			products,
			lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
		}
	} catch (error) {
		console.error('Error getting products by category and subcategory:', error)
		return { products: [] }
	}
}

/**
 * Fetches products from Firestore based on the provided category, with pagination.
 *
 * @param {string} categoryId - The ID of the category.
 * @param {QueryDocumentSnapshot} [lastDoc] - The last document from the previous fetch for pagination.
 * @returns {Promise<{ products: TProduct[], lastDoc?: QueryDocumentSnapshot }>} A promise that resolves to an object containing an array of Product objects and optionally the last document for further pagination.
 */
export async function fetchProductsByCategory(
	categoryId: string,
	lastDoc?: QueryDocumentSnapshot
): Promise<{ products: TProduct[]; lastDoc?: QueryDocumentSnapshot }> {
	try {
		const productsCollection = collection(db, 'products')
		const categoryRef = doc(collection(db, 'categories'), categoryId)

		let productsQuery = query(
			productsCollection,
			where('category', '==', categoryRef),
			limit(LIMIT)
		)

		if (lastDoc) {
			productsQuery = query(productsQuery, startAfter(lastDoc))
		}

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

		return {
			products,
			lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
		}
	} catch (error) {
		console.error('Error getting products by category:', error)
		return { products: [] }
	}
}
