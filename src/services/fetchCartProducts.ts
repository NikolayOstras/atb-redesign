import { collection, getDoc, getDocs } from 'firebase/firestore'
import { ICardProps } from '../components/card/Card'
import { db } from '../lib/firebase'
import { TProduct } from '../utils/types'

/**
 * Fetches all products from the shoppingCart collection in Firestore.
 *
 * @returns {Promise<ICardProps[]>} A promise that resolves to an array of CartProduct objects.
 */
export async function fetchCartProducts(): Promise<ICardProps[]> {
	try {
		const cartCollection = collection(db, 'shoppingCart')
		const querySnapshot = await getDocs(cartCollection)

		const cartProducts: ICardProps[] = await Promise.all(
			querySnapshot.docs.map(async docSnapshot => {
				const productRef = docSnapshot.data().product
				const productDoc = await getDoc(productRef)

				if (!productDoc.exists()) {
					console.error(`Product not found for document ID: ${docSnapshot.id}`)
					return null
				}

				const productData = productDoc.data() as TProduct

				return {
					id: docSnapshot.id,
					img: productData.img,
					link: productData.link,
					price: productData.price,
					priceHistory: productData.priceHistory || [],
					title: productData.title,
				}
			})
		)

		// Filter out null values
		return cartProducts.filter(
			(product): product is ICardProps => product !== null
		)
	} catch (error) {
		console.error('Error getting cart products:', error)
		return []
	}
}
