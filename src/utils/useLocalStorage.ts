import { useState } from 'react'

function useLocalStorage<T>(
	key: string,
	initialValue: T | (() => T)
): [
	T | undefined,
	(
		value: T | undefined | ((prevValue: T | undefined) => T | undefined)
	) => void,
	() => void
] {
	const [storedValue, setStoredValue] = useState<T | undefined>(() => {
		try {
			const item = window.localStorage.getItem(key)
			return item
				? JSON.parse(item)
				: initialValue instanceof Function
				? initialValue()
				: initialValue
		} catch (error) {
			console.warn(
				`Failed to parse storage item for key "${key}". Resetting to default value.`
			)
			return initialValue instanceof Function ? initialValue() : initialValue
		}
	})

	const setValue = (
		value: T | undefined | ((prevValue: T | undefined) => T | undefined)
	) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value
			setStoredValue(valueToStore)

			if (valueToStore === undefined) {
				window.localStorage.removeItem(key)
			} else {
				window.localStorage.setItem(key, JSON.stringify(valueToStore))
			}
		} catch (error) {
			console.warn(`Failed to set storage item for key "${key}".`)
		}
	}

	const remove = () => {
		try {
			window.localStorage.removeItem(key)
			setStoredValue(undefined)
		} catch (error) {
			console.warn(`Failed to remove storage item for key "${key}".`)
		}
	}

	return [storedValue, setValue, remove]
}

export default useLocalStorage
