import type { TProduct } from '@/components/products-container/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function searchProductsByPrefix(prefix: string) {
	const productsRef = collection(db, 'products');
	const start = prefix;
	const end = `${prefix}\uf8ff`; // Unicode trick to get all strings starting with the prefix

	const q = query(
		productsRef,
		where('title', '>=', start),
		where('title', '<', end),
	);

	const querySnapshot = await getDocs(q);
	const products: TProduct[] = [];

	for (const doc of querySnapshot.docs) {
		products.push({
			id: doc.id,
			img: doc.data().img,
			title: doc.data().title,
			price: doc.data().price,
			priceHistory: doc.data().priceHistory,
			link: doc.data().link,
		});
	}

	return products;
}
