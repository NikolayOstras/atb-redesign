import type { TPriceHistory } from '@/components/products-container/types';
import { useMemo } from 'react';

export function usePriceChartData(priceHistory: TPriceHistory[]) {
	const chartData = useMemo(
		() =>
			priceHistory.map((item) => ({
				date: item.timestamp.toDate().toLocaleDateString(),
				price: item.price,
			})),
		[priceHistory],
	);

	// Calculate Y-axis domain
	const minPrice = Math.min(...priceHistory.map((item) => item.price));
	const maxPrice = Math.max(...priceHistory.map((item) => item.price));
	const yDomain = [minPrice - 10, maxPrice + 10]; // Add some padding

	return { chartData, yDomain };
}
