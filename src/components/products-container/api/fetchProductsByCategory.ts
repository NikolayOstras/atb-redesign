import {
	type QueryDocumentSnapshot,
	collection,
	doc,
	getDocs,
	limit,
	query,
	startAfter,
	where,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { LIMIT } from '../../../utils/const';
import type { TProduct } from '../types';
/**
 * Fetches products from Firestore based on the provided category, with pagination.
 *
 * @param {string} categoryId - The ID of the category.
 * @param {QueryDocumentSnapshot} [lastDoc] - The last document from the previous fetch for pagination.
 * @returns {Promise<{ products: TProduct[], lastDoc?: QueryDocumentSnapshot }>} A promise that resolves to an object containing an array of Product objects and optionally the last document for further pagination.
 */
export async function fetchProductsByCategory(
	categoryId: string,
	lastDoc?: QueryDocumentSnapshot,
	totalCount?: number,
): Promise<{ products: TProduct[]; lastDoc?: QueryDocumentSnapshot }> {
	try {
		const productsCollection = collection(db, 'products');
		const categoryRef = doc(collection(db, 'categories'), categoryId);

		let productsQuery = query(
			productsCollection,
			where('category', '==', categoryRef),
			limit(LIMIT),
		);

		if (lastDoc) {
			productsQuery = query(productsQuery, startAfter(lastDoc));
		}

		const querySnapshot = await getDocs(productsQuery);
		const products = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			img: doc.data().img,
			link: doc.data().link,
			price: doc.data().price,
			priceHistory: doc.data().priceHistory || [],
			title: doc.data().title,
		}));

		return {
			products,
			lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
		};
	} catch (error) {
		console.error('Error getting products by category:', error);
		return { products: [] };
	}
}
