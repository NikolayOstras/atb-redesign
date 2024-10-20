/** @type {import('tailwindcss').Config} */

export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		colors: {
			cMain: {
				DEFAULT: '#313131',
				50: '#515151',
			},
			cBg: {
				DEFAULT: '#ffffff',
				50: '#f6f6f6',
			},
			cActive: {
				DEFAULT: '#FF3C3C',
				50: '#e63636',
				100: '#cc3030',
			},
			cInfo: {
				DEFAULT: '#ff9551',
				50: '#e68649',
				100: '#cc7741',
			},
			cAccent: {
				DEFAULT: '#00ac6a',
				50: '#009b5f',
				100: '#008a55',
			},
		},
		extend: {
			container: {
				center: true,
				padding: '1rem', // Adjust padding as needed
				screens: {
					sm: '640px',
					md: '768px',
					lg: '1024px',
					xl: '1280px',
					'2xl': '1536px',
				},
			},
		},
	},
	plugins: [],
}