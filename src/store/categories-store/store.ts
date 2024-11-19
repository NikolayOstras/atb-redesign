import { create } from 'zustand'
import { fetchCategories } from './api/fetchCategories'
import { CategoriesState, TCategory } from './types'

const useCategoriesStore = create<CategoriesState>(set => ({
	categories: [] as TCategory[],
	loading: true,
	fetchCategories: async () => {
		set({ loading: true })
		try {
			const data = await fetchCategories()
			set({ categories: data, loading: false })
		} catch (error) {
			console.error('Error fetching categories:', error)
			set({ loading: false })
		}
	},
}))

export default useCategoriesStore
