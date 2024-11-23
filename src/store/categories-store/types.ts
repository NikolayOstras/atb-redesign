import type { DocumentReference } from 'firebase/firestore';

export type TSubcategory = {
	id: string;
	title: string;
	amount: number;
	category: DocumentReference;
};

export type TCategory = {
	id: string;
	title: string;
	subcategories: TSubcategory[];
};

export interface CategoriesState {
	categories: TCategory[];
	loading: boolean;
	fetchCategories: () => Promise<void>;
}
