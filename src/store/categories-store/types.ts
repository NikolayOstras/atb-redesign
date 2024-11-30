import type { DocumentReference } from 'firebase/firestore'

export type TSubcategory = {
	id: string
	title: string
	amount: number
	category: DocumentReference
}

export type TCategory = {
	id: string
	title: string
	subcategories: TSubcategory[]
	amount: number
}

export interface CategoriesState {
	categories: TCategory[]
	loading: boolean
	amount: number
	fetchCategories: () => Promise<void>
}
