import { Loader } from '../Loader'
import { LoadMoreButton } from './LoadMoreButton'
import { ProductsGrid } from './ProductsGrid'
import { useProducts } from './hooks/use-products/useProducts'

export function ProductsContainer() {
	const { products, loading, error, lastDoc, loadMore, totalCount } =
		useProducts()

	if (loading && products.length === 0) return <Loader />
	if (error) return <div>{error}</div>
	if (products.length === 0) return <div>No products available</div>

	const showLoadMore =
		lastDoc && totalCount !== undefined && products.length < totalCount

	return (
		<>
			<ProductsGrid products={products} />
			{showLoadMore && <LoadMoreButton loading={loading} onClick={loadMore} />}
		</>
	)
}
