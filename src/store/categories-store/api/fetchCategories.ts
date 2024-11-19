import { db } from '@/lib/firebase'
import { DocumentReference, collection, getDocs } from 'firebase/firestore'
import { TCategory, TSubcategory } from '../types'

/**
 * Fetches categories and their subcategories from Firestore.
 *
 * @returns {Promise<TCategory[]>} A promise that resolves to an array of Category objects, each containing an array of Subcategory objects.
 */

export const fetchCategories = async (): Promise<TCategory[]> => {
	try {
		const categoriesCollection = collection(db, 'categories')
		const categoriesSnapshot = await getDocs(categoriesCollection)
		const categoriesData = categoriesSnapshot.docs.map(doc => ({
			id: doc.id,
			title: doc.data().title || '',
		}))

		const subcategoriesCollection = collection(db, 'subcategories')
		const subcategoriesSnapshot = await getDocs(subcategoriesCollection)

		const subcategoriesData: TSubcategory[] = subcategoriesSnapshot.docs.map(
			doc => ({
				id: doc.id,
				title: doc.data().title || '',
				amount: doc.data().amount || 0,
				category: doc.data().category as DocumentReference,
			})
		)

		const result: TCategory[] = categoriesData.map(category => ({
			id: category.id,
			title: category.title,
			subcategories: subcategoriesData.filter(
				subcategory => subcategory.category.id === category.id
			),
		}))

		return result
	} catch (error) {
		console.error('Error fetching categories:', error)
		throw error
	}
}
