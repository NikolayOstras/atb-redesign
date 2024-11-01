import { useEffect, useState } from 'react'

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.warn(`Error reading from localStorage: ${error}`)
			return initialValue
		}
	})

	const setValue = (value: T) => {
		try {
			setStoredValue(value)
			window.localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			console.warn(`Error writing to localStorage: ${error}`)
		}
	}

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === key) {
				try {
					setStoredValue(
						event.newValue ? JSON.parse(event.newValue) : initialValue
					)
				} catch (error) {
					console.warn(`Error parsing localStorage value: ${error}`)
				}
			}
		}

		window.addEventListener('storage', handleStorageChange)

		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [key, initialValue])

	return [storedValue, setValue]
}
