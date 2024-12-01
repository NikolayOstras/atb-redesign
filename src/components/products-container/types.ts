import type { Timestamp } from 'firebase/firestore';

export type TPriceHistory = {
	price: number;
	timestamp: Timestamp;
};

export type TProduct = {
	img: string;
	link: string;
	price: number;
	id: string;
	priceHistory: TPriceHistory[];
	title: string;
};
