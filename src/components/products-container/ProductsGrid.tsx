import { Card, ICardProps } from '../card/Card'

interface ProductsGridProps {
	products: ICardProps[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
	return (
		<div className='px-8 sm:px-0 grid grid-cols-1 sm:grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-8 py-8'>
			{products.map(product => (
				<Card key={product.title} {...product} />
			))}
		</div>
	)
}
