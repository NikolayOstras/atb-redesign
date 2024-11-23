import type { TProduct } from '@/components/products-container/types';
import { create } from 'zustand';

interface SearchStore {
	results: TProduct[];
	setResults: (results: TProduct[]) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
	results: [],
	setResults: (results) => set({ results }),
}));
