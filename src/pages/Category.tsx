import useCategoriesStore from '@/store/categories-store/store';
import type { TCategory } from '@/store/categories-store/types';
import { useEffect, useState } from 'react';
import { Link, ScrollRestoration, useParams } from 'react-router-dom';
import { ProductsContainer } from '../components/products-container/ProductsContainer';

export function Category() {
	const { categoryId } = useParams<{
		categoryId: string;
		subCategoryId?: string;
	}>();
	const { categories } = useCategoriesStore(); // Moved outside useEffect

	const [currentCategory, setCurrentCategory] = useState<TCategory>();

	useEffect(() => {
		const currentCategory = categories.find(
			(category) => category.id === categoryId,
		);
		console.log(currentCategory);
		currentCategory ? setCurrentCategory(currentCategory) : null;
	}, [categoryId, categories]); // Added categories as dependency

	return (
		<>
			<ScrollRestoration />
			<div className="flex flex-wrap gap-2 my-6 px-4">
				{currentCategory?.subcategories.map((subcategory) => (
					<Link
						key={subcategory.id}
						to={`/category/${categoryId}/${subcategory.id}`}
						className="badge"
					>
						{subcategory.title}
					</Link>
				))}
			</div>
			<ProductsContainer />
		</>
	);
}
