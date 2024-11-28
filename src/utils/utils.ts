import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(
		() => window.matchMedia(query).matches,
	);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query);
		const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

		mediaQueryList.addEventListener('change', listener);

		setMatches(mediaQueryList.matches);

		return () => mediaQueryList.removeEventListener('change', listener);
	}, [query]);

	return matches;
}

export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
