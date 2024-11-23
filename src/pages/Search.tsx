import { ProductsGrid } from '@/components/products-container/ProductsGrid';
import { SearchComponent } from '@/components/search/Search';
import { useSearchStore } from '@/store/search-store/store';

export function Search() {
	const { results } = useSearchStore();
	return (
		<div className="container">
			<SearchComponent />
			<ProductsGrid products={results} />
		</div>
	);
}
