import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

export type TCategory = {
	name: string
	subcategories: string[]
}

/**
 * Fetches all categories and their subcategories from Firestore.
 *
 * @returns {Promise<TCategory[]>} A promise that resolves to an array of Category objects.
 */
export const fetchCategories = async (): Promise<TCategory[]> => {
	try {
		const categoriesCollection = collection(db, 'categories')
		const categoriesSnapshot = await getDocs(categoriesCollection)

		const categories: TCategory[] = [] // Initialize as an empty array

		for (const categoryDoc of categoriesSnapshot.docs) {
			const categoryName = categoryDoc.data().name

			// Fetch subcategories for the current category
			const subcategoriesCollection = collection(
				categoryDoc.ref,
				'subcategories'
			)
			const subcategoriesSnapshot = await getDocs(subcategoriesCollection)
			const subcategoryNames = subcategoriesSnapshot.docs.map(
				doc => doc.data().name
			)

			// Push a new Category object to the array
			categories.push({
				name: categoryName,
				subcategories: subcategoryNames,
			})
		}

		return categories
	} catch (error) {
		console.error('Error fetching categories:', error)
		throw error
	}
}
