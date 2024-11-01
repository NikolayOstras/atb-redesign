import { ArrowRight } from '../icons/ArrowRight'
import { TProduct } from '../services/fetchProducts'

export function Card({ title, img, price, link }: TProduct) {
	return (
		<article className='bg-cBg-50 flex flex-col gap-2 p-8 rounded-xl shadow'>
			<img
				src={img}
				alt={title}
				width={200}
				height={200}
				className='object-cover rounded-xl'
			/>
			<p>{title}</p>
			<div className='flex justify-between mt-auto'>
				<p>{price}</p>
				<a
					href={link}
					className='text-cInfo p-2 hover:text-cInfo-100 transition-colors'
					target='_blank'
					rel='noreferrer'
				>
					<ArrowRight />
				</a>
			</div>
		</article>
	)
}
