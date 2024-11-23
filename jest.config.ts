import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.ts',
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.(js|jsx|mjs|cjs)$': 'babel-jest',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testMatch: [
		'**/__tests__/**/*.+(ts|tsx|js)',
		'**/?(*.)+(spec|test).+(ts|tsx|js)',
	],
	moduleDirectories: ['node_modules', 'src'],
}

export default config
