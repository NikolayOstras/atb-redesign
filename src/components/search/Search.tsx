import { useSearchStore } from '@/store/search-store/store'
import useDebounce from '@/utils/utils'
import { useEffect, useState } from 'react'
import { Loader } from '../Loader'
import { searchProductsByPrefix } from './api/searchProductsByPrefix'

export function SearchComponent() {
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(false)
	const { results, setResults } = useSearchStore()

	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	const startSearch = async (term: string) => {
		setLoading(true)
		try {
			const products = await searchProductsByPrefix(term)
			setResults(products)
			console.log(products)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (debouncedSearchTerm) {
			startSearch(debouncedSearchTerm)
		}
	}, [debouncedSearchTerm])

	return (
		<div>
			<input
				type='text'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				placeholder='Пошук товарiв...'
				className='w-full p-4 bg-cBg-50 text-3xl shadow-md rounded-md outline-none focus:ring ring-cAccent'
			/>
			{loading && (
				<div className='flex justify-center mt-8 mb-4'>
					<Loader />
				</div>
			)}
		</div>
	)
}
