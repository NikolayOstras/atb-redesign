import { translateCategoriesToUA } from '@/utils/translateCategoriesToUA'
import { create } from 'zustand'
import { fetchCategories } from './api/fetchCategories'
import type { CategoriesState, TCategory } from './types'

const useCategoriesStore = create<CategoriesState>(set => ({
	categories: [] as TCategory[],
	loading: true,
	amount: 0,
	fetchCategories: async () => {
		set({ loading: true })
		try {
			const data = await fetchCategories()
			set({ categories: translateCategoriesToUA(data), loading: false })
		} catch (error) {
			console.error('Error fetching categories:', error)
			set({ loading: false })
		}
	},
}))

export default useCategoriesStore
