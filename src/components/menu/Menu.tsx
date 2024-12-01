import { Loader } from '@/components/Loader';
import type { TCategory } from '@/store/categories-store/types';
import { useState } from 'react';
import { CategoryTitle } from './CategoryTitle';

interface MenuProps {
	categories: TCategory[] | null;
	onClose: () => void;
}

export function Menu({ categories, onClose }: MenuProps) {
	const [openCategories, setOpenCategories] = useState<string[]>([]);

	const toggleCategory = (categoryName: string) => {
		setOpenCategories((prev) =>
			prev.includes(categoryName)
				? prev.filter((name) => name !== categoryName)
				: [categoryName],
		);
	};

	return (
		<div className="fade ">
			<nav className="overflow-y-auto h-[90vh] xl:h-auto xl:overflow-y-visible scrollbar-gutter-stable scroll-small py-4 xl:py-0">
				<ul className="text-xl xl:font-semibold flex flex-col items-center gap-1 xl:gap-4 xl:flex-row xl:flex-wrap xl:text-base relative z-100">
					{categories === null ? (
						<li>
							<Loader />
						</li>
					) : (
						categories.map((category) => (
							<CategoryTitle
								key={category.id}
								category={category}
								isOpen={openCategories.includes(category.title)}
								onToggle={() => toggleCategory(category.title)}
								onClose={onClose}
							/>
						))
					)}
				</ul>
			</nav>
		</div>
	);
}
