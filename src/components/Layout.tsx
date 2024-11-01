import { ReactNode, useEffect } from 'react' // Import ReactNode
import useCategoriesStore from '../utils/store'
import { Header } from './Header'

export function Layout({ children }: { children: ReactNode }) {
	const { fetchCategories } = useCategoriesStore()

	useEffect(() => {
		// Fetch categories when the component mounts
		fetchCategories()
	}, [fetchCategories])

	return (
		<div className='container'>
			<Header />
			{children} {/* Render the children here */}
		</div>
	)
}
