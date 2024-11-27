import { useSearchStore } from '@/store/search-store/store'
import { formatSearchTerm } from '@/utils/useFormatSearchTerm'
import useDebounce from '@/utils/utils'
import { useCallback, useEffect, useState } from 'react'
import { Loader } from '../Loader'
import { searchProductsByPrefix } from './api/searchProductsByPrefix'

export function SearchComponent() {
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(false)
	const { setResults } = useSearchStore()

	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	// Memoize the startSearch function
	const startSearch = useCallback(
		async (term: string) => {
			setLoading(true)
			try {
				const products = await searchProductsByPrefix(term)
				setResults(products)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		},
		[setResults]
	)

	useEffect(() => {
		if (debouncedSearchTerm) {
			startSearch(debouncedSearchTerm)
		}
	}, [debouncedSearchTerm, startSearch])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value
		const formattedValue = formatSearchTerm(rawValue)
		setSearchTerm(formattedValue)
	}

	return (
		<div>
			<input
				type='text'
				value={searchTerm}
				onChange={handleInputChange}
				placeholder='Пошук товарiв...'
				className='w-full p-4 bg-cBg-50 xl:text-3xl shadow-md rounded-md outline-none focus:ring ring-cAccent dark:bg-cMain-50'
			/>
			{loading && (
				<div className='flex justify-center mt-8 mb-4'>
					<Loader />
				</div>
			)}
		</div>
	)
}
