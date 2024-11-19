import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage<T>(
	key: string,
	defaultValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
	return useStorage<T>(key, defaultValue, window.localStorage)
}

export function useSessionStorage<T>(
	key: string,
	defaultValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
	return useStorage<T>(key, defaultValue, window.sessionStorage)
}

function useStorage<T>(
	key: string,
	defaultValue: T | (() => T),
	storageObject: Storage
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
	const [value, setValue] = useState<T>(() => {
		const jsonValue = storageObject.getItem(key)
		if (jsonValue != null) {
			try {
				return JSON.parse(jsonValue) as T
			} catch {
				console.warn(
					`Failed to parse storage item for key "${key}". Resetting to default value.`
				)
			}
		}
		return typeof defaultValue === 'function'
			? (defaultValue as () => T)()
			: defaultValue
	})

	useEffect(() => {
		if (value === undefined) {
			storageObject.removeItem(key)
		} else {
			storageObject.setItem(key, JSON.stringify(value))
		}
	}, [key, value, storageObject])

	const remove = useCallback(() => {
		setValue(undefined as unknown as T) // Cast `undefined` to `T` to satisfy TypeScript
	}, [])

	return [value, setValue, remove]
}

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

	useEffect(() => {
		const mediaQueryList = window.matchMedia(query)
		const listener = (event: MediaQueryListEvent) => setMatches(event.matches)

		mediaQueryList.addEventListener('change', listener)

		setMatches(mediaQueryList.matches)

		return () => mediaQueryList.removeEventListener('change', listener)
	}, [query])

	return matches
}

export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debouncedValue
}

export default useDebounce
