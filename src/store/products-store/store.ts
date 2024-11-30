import { create } from 'zustand'
import { loadProducts } from './api/loadProducts'
import type { ProductsStore } from './types'

export const useProductsStore = create<ProductsStore>()((set, get) => ({
	products: [],
	loading: false,
	error: null,
	lastDoc: null,
	totalCount: undefined,

	fetchInitialProducts: async (categoryId, subCategoryId) => {
		set({ loading: true, error: null })

		try {
			const { products, lastDoc, count } = await loadProducts(
				categoryId,
				subCategoryId
			)
			set({
				products,
				lastDoc: lastDoc || null,
				totalCount: count, // Set total count
				loading: false,
			})
		} catch (error) {
			console.error(error)
			set({ error: 'Failed to load products', loading: false })
		}
	},

	loadMore: async (categoryId, subCategoryId) => {
		const { lastDoc, products } = get()
		if (!lastDoc) return

		set({ loading: true, error: null })

		try {
			const { products: moreProducts, lastDoc: newLastDoc } =
				await loadProducts(categoryId, subCategoryId, lastDoc)
			set({
				products: [...products, ...moreProducts],
				lastDoc: newLastDoc || null,
				loading: false,
			})
		} catch (error) {
			console.error(error)
			set({ error: 'Failed to load more products', loading: false })
		}
	},

	getProductCount: async (categoryId: string, subCategoryId?: string) => {
		set({ loading: true, error: null })

		try {
			const { count } = await loadProducts(categoryId, subCategoryId)
			set({ totalCount: count, loading: false })
			return count
		} catch (error) {
			console.error(error)
			set({ error: 'Failed to fetch product count', loading: false })
			return 0
		}
	},

	reset: () => {
		set({
			products: [],
			loading: false,
			error: null,
			lastDoc: null,
			totalCount: undefined,
		})
	},
}))
