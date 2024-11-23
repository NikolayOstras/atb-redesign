import type { TSubcategory } from '@/store/categories-store/types';
import { Link } from 'react-router-dom';

interface SubcategoryItemProps {
	item: TSubcategory;
	categoryId: string;
	onClose: () => void;
}

export function SubcategoryItem({
	item,
	categoryId,
	onClose,
}: SubcategoryItemProps) {
	return (
		<li className="flex flex-row-reverse px-6 py-3 hover:text-cActive transition-colors xl:px-2">
			<Link
				to={`/category/${categoryId}/${item.id}`}
				className="capitalize text-nowrap"
				onClick={onClose}
			>
				{item.title}
				<span className="ml-2 text-cInfo">{item.amount}</span>
			</Link>
		</li>
	);
}
