import { db } from '@/lib/firebase'
import { collection, getDocs, type DocumentReference } from 'firebase/firestore'
import type { TCategory, TSubcategory } from '../types'

/**
 * Fetches categories and their subcategories from Firestore.
 *
 * @returns {Promise<TCategory[]>} A promise that resolves to an array of Category objects, each containing an array of Subcategory objects.
 */

export const fetchCategories = async (): Promise<TCategory[]> => {
	try {
		// Fetch categories collection
		const categoriesCollection = collection(db, 'categories')
		const categoriesSnapshot = await getDocs(categoriesCollection)
		const categoriesData = categoriesSnapshot.docs.map(doc => ({
			id: doc.id,
			title: doc.data().title || '',
		}))

		// Fetch subcategories collection
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

		// Map categories, associate subcategories, and calculate total amount
		const result: TCategory[] = categoriesData.map(category => {
			// Filter subcategories related to the current category
			const associatedSubcategories = subcategoriesData.filter(
				subcategory => subcategory.category.id === category.id
			)

			// Calculate the total amount using a reducer
			const totalAmount = associatedSubcategories.reduce(
				(acc, subcategory) => acc + subcategory.amount,
				0
			)

			return {
				id: category.id,
				title: category.title,
				subcategories: associatedSubcategories,
				amount: totalAmount, // Set total amount
			}
		})

		return result
	} catch (error) {
		console.error('Error fetching categories:', error)
		throw error
	}
}
