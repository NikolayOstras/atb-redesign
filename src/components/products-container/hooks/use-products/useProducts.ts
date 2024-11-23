import useCategoriesStore from '@/store/categories-store/store';
import type { TCategory, TSubcategory } from '@/store/categories-store/types';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { TProduct } from '../../types';
import { loadProducts } from './loadProducts';

interface UseProductsResult {
	products: TProduct[];
	loading: boolean;
	error: string | null;
	lastDoc: QueryDocumentSnapshot | null;
	loadMore: () => Promise<void>;
	totalCount?: number;
}

export function useProducts(): UseProductsResult {
	const { categories } = useCategoriesStore();
	const { categoryId, subCategoryId } = useParams<{
		categoryId: string;
		subCategoryId?: string;
	}>();
	const [products, setProducts] = useState<TProduct[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
	const currentCategory: TCategory | undefined = categories.find(
		(category) => category.id === categoryId,
	);
	const currentSubcategory: TSubcategory | undefined =
		currentCategory?.subcategories.find(
			(subcategory) => subcategory.id === subCategoryId,
		);
	let totalCount = 0;
	if (currentSubcategory) {
		totalCount = currentSubcategory.amount;
	} else if (currentCategory) {
		totalCount = currentCategory.subcategories.reduce(
			(total, subcategory) => total + subcategory.amount,
			0,
		);
	}

	const fetchInitialProducts = useCallback(async () => {
		if (!categoryId) return;
		setLoading(true);
		setError(null);

		try {
			const { products: newProducts, lastDoc: newLastDoc } = await loadProducts(
				categoryId,
				subCategoryId,
			);
			setProducts(newProducts);
			setLastDoc(newLastDoc || null);
		} catch (err) {
			setError('Failed to load products');
			console.error(err);
		} finally {
			setLoading(false);
		}
	}, [categoryId, subCategoryId]);

	const loadMore = async () => {
		if (!categoryId || !lastDoc) return;

		setLoading(true);
		setError(null);

		try {
			const { products: moreProducts, lastDoc: newLastDoc } =
				await loadProducts(categoryId, subCategoryId, lastDoc);
			setProducts((prevProducts) => [...prevProducts, ...moreProducts]);
			setLastDoc(newLastDoc || null);
		} catch (err) {
			setError('Failed to load more products');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchInitialProducts();
	}, [fetchInitialProducts]);

	return {
		products,
		loading,
		error,
		lastDoc,
		loadMore,
		totalCount,
	};
}
