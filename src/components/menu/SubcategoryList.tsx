import type { TCategory } from '@/store/categories-store/types';
import { Link } from 'react-router-dom';
import { SubcategoryItem } from './SubcategoryItem';

interface ISubcategoryListProps {
	category: TCategory;
	onClose: () => void;
}

export function SubcategoryList({ category, onClose }: ISubcategoryListProps) {
	return (
		<ul className="subcategories-list">
			<li
				key={`${category.id}-all`}
				className="flex flex-row-reverse px-4 py-3 hover:text-cActive transition-colors xl:px-2"
			>
				<Link
					to={`/category/${category.id}`}
					className="capitalize xl:text-base"
					onClick={onClose}
				>
					Всі товари
					<span className="ml-2 text-cInfo">
						(
						{category.subcategories.reduce((sum, item) => sum + item.amount, 0)}
						)
					</span>
				</Link>
			</li>
			{category.subcategories.map((item) => (
				<SubcategoryItem
					key={item.id}
					item={item}
					categoryId={category.id}
					onClose={onClose}
				/>
			))}
		</ul>
	);
}
