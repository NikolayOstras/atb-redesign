import { act, renderHook } from '@testing-library/react-hooks';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useLocalStorage from '../src/utils/useLocalStorage';

describe('useLocalStorage', () => {
	let storageMock: Storage;

	beforeEach(() => {
		storageMock = {
			getItem: vi.fn(),
			setItem: vi.fn(),
			removeItem: vi.fn(),
			key: vi.fn(),
			length: 0,
			clear: vi.fn(),
		};

		// @ts-ignore: mocking localStorage
		global.localStorage = storageMock;
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should use the stored value if it exists', () => {
		storageMock.getItem = vi
			.fn()
			.mockReturnValue(JSON.stringify('storedValue'));
		const { result } = renderHook(() =>
			useLocalStorage('testKey', 'defaultValue'),
		);
		expect(result.current[0]).toBe('storedValue');
		expect(storageMock.getItem).toHaveBeenCalledWith('testKey');
	});

	it('should handle JSON parsing errors', () => {
		const consoleWarnSpy = vi.spyOn(console, 'warn');
		storageMock.getItem = vi.fn().mockReturnValue('invalid JSON');

		const { result } = renderHook(() =>
			useLocalStorage<string>('testKey', 'defaultValue'),
		);
		expect(consoleWarnSpy).toHaveBeenCalledWith(
			`Failed to parse storage item for key "testKey". Resetting to default value.`,
		);
		expect(result.current[0]).toBe('defaultValue');
	});

	it('should update the stored value when the setter is called', () => {
		const { result } = renderHook(() =>
			useLocalStorage('testKey', 'defaultValue'),
		);
		act(() => {
			result.current[1]('newValue');
		});
		expect(result.current[0]).toBe('newValue');
		expect(storageMock.setItem).toHaveBeenCalledWith(
			'testKey',
			JSON.stringify('newValue'),
		);
	});

	it('should remove the item from storage when setting value to undefined', () => {
		const { result } = renderHook(() =>
			useLocalStorage('testKey', 'defaultValue'),
		);
		act(() => {
			result.current[1](undefined);
		});
		expect(result.current[0]).toBeUndefined();
		expect(storageMock.removeItem).toHaveBeenCalledWith('testKey');
	});

	it('should use a function as defaultValue', () => {
		const { result } = renderHook(() =>
			useLocalStorage('testKey', () => 'defaultValue'),
		);
		expect(result.current[0]).toBe('defaultValue');
	});

	it('should remove the item from storage when remove is called', () => {
		const { result } = renderHook(() =>
			useLocalStorage('testKey', 'defaultValue'),
		);
		act(() => {
			result.current[2]();
		});
		expect(result.current[0]).toBeUndefined();
		expect(storageMock.removeItem).toHaveBeenCalledWith('testKey');
	});
});
