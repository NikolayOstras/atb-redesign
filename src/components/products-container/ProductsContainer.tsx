import { Loader } from '../Loader'
import { ErrorMessage } from './ErrorMessage'
import { LoadMoreButton } from './LoadMoreButton'
import { NoProductsMessage } from './NoProductsMessage'
import { ProductsGrid } from './ProductsGrid'
import { useProducts } from './useProducts'

export function ProductsContainer() {
	const { products, loading, error, lastDoc, loadMore } = useProducts()

	if (loading && products.length === 0) return <Loader />
	if (error) return <ErrorMessage error={error} />
	if (products.length === 0) return <NoProductsMessage />

	return (
		<>
			<ProductsGrid products={products} />
			{lastDoc && <LoadMoreButton loading={loading} onClick={loadMore} />}
		</>
	)
}
