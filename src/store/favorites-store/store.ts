import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FavoritesState {
	favorites: string[]
	toggleFavorite: (id: string) => void
	isFavorite: (id: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: [],
			toggleFavorite: (id: string) =>
				set(state => ({
					favorites: state.favorites.includes(id)
						? state.favorites.filter(favId => favId !== id)
						: [...state.favorites, id],
				})),
			isFavorite: (id: string) => get().favorites.includes(id),
		}),
		{
			name: 'favorites-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
)
