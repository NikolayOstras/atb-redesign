import type { TProduct } from '@/components/products-container/types';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function fetchProductById(
	productId: string,
): Promise<TProduct | null> {
	try {
		const productRef = doc(db, 'products', productId);
		const productSnap = await getDoc(productRef);

		if (productSnap.exists()) {
			return {
				id: productSnap.id,
				...productSnap.data(),
			} as TProduct;
		}
		return null;
	} catch (error) {
		console.error('Error fetching product:', error);
		return null;
	}
}
