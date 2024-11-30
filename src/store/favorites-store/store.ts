import { TProduct } from '@/components/products-container/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FavoritesState {
	favorites: TProduct[]
	toggleFavorite: (product: TProduct) => void
	isFavorite: (id: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: [],
			toggleFavorite: (product: TProduct) =>
				set(state => ({
					favorites: state.favorites.some(item => item.id === product.id)
						? state.favorites.filter(item => item.id !== product.id)
						: [...state.favorites, product],
				})),
			isFavorite: (id: string) => get().favorites.some(item => item.id === id),
		}),
		{
			name: 'favorites-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
)
