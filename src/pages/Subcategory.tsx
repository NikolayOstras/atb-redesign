import { ChevronLeft } from '@/icons/ChevronLeft'
import { Link, ScrollRestoration, useParams } from 'react-router-dom'
import { ProductsContainer } from '../components/products-container/ProductsContainer'

export function Subcategory() {
	const { categoryId } = useParams<{
		categoryId: string
		subCategoryId?: string
	}>()
	return (
		<>
			<ScrollRestoration />
			<Link
				to={`/category/${categoryId}`}
				className='flex gap-2 text-lg font-semibold hover:underline text-cAccent hover:text-cAccent-50 transition-colors'
			>
				<ChevronLeft />
				<span>Назад</span>
			</Link>
			<ProductsContainer />
		</>
	)
}
