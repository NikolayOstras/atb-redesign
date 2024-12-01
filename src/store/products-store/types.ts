import type { TProduct } from '@/components/products-container/types';
import type { QueryDocumentSnapshot } from 'firebase/firestore';

export interface ProductsStore {
	products: TProduct[];
	loading: boolean;
	error: string | null;
	lastDoc: QueryDocumentSnapshot | null;
	totalCount: number | undefined;
	fetchInitialProducts: (
		categoryId: string,
		subCategoryId?: string,
	) => Promise<void>;
	loadMore: (categoryId: string, subCategoryId?: string) => Promise<void>;
	reset: () => void;
}
