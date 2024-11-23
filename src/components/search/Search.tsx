import { useSearchStore } from '@/store/search-store/store';
import useDebounce from '@/utils/utils';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { searchProductsByPrefix } from './api/searchProductsByPrefix';

export function SearchComponent() {
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(false);
	const { setResults } = useSearchStore();

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	// Memoize the startSearch function
	const startSearch = useCallback(
		async (term: string) => {
			setLoading(true);
			try {
				const products = await searchProductsByPrefix(term);
				setResults(products);
				console.log(products);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		},
		[setResults],
	);

	useEffect(() => {
		if (debouncedSearchTerm) {
			startSearch(debouncedSearchTerm);
		}
	}, [debouncedSearchTerm, startSearch]);

	return (
		<div>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Пошук товарiв..."
				className="w-full p-4 bg-cBg-50 text-3xl shadow-md rounded-md outline-none focus:ring ring-cAccent"
			/>
			{loading && (
				<div className="flex justify-center mt-8 mb-4">
					<Loader />
				</div>
			)}
		</div>
	);
}
