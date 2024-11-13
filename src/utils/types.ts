import { DocumentReference, Timestamp } from 'firebase/firestore'

export type TPriceHistory = {
	price: number
	timestamp: Timestamp
}

export type TProduct = {
	img: string
	link: string
	price: number
	id: string
	priceHistory: TPriceHistory[]
	title: string
	category: DocumentReference
	subcategory: DocumentReference
}

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
}
