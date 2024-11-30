import { Loader } from '../Loader'
import { LoadMoreButton } from './LoadMoreButton'
import { ProductsGrid } from './ProductsGrid'
import { useProducts } from './hooks/useProducts'

export function ProductsContainer() {
	const { products, loading, error, loadMore, totalCount } = useProducts()
	const hasMoreProducts = totalCount ? products.length < totalCount : true
	const progressPercentage = totalCount
		? (products.length / totalCount) * 100
		: 0

	if (loading && products.length === 0)
		return (
			<div className='flex justify-center'>
				<Loader />
			</div>
		)
	if (error) return <div>{error}</div>
	if (products.length === 0) return <div>No products available</div>

	return (
		<>
			<div className='w-full mb-4'>
				<div className='h-full w-1 bg-cBg-50 dark:bg-cMain-50 rounded-full overflow-hidden fixed top-0 left-0 z-[1]'>
					<div
						className='h-full bg-cAccent rounded-full transition-all duration-300 ease-in-out'
						style={{ height: `${progressPercentage}%` }}
					/>
				</div>
			</div>
			<ProductsGrid products={products} />
			{hasMoreProducts && (
				<LoadMoreButton loading={loading} onClick={loadMore} />
			)}
		</>
	)
}
