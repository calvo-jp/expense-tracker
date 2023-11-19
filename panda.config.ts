import {defineConfig} from '@pandacss/dev';

export default defineConfig({
	preflight: true,
	include: ['./src/**/*.{ts,tsx}'],
	exclude: [],
	theme: {
		extend: {
			tokens: {
				fonts: {
					sans: {
						value: 'var(--font-sans)',
					},
				},
			},
		},
	},
	outdir: 'src/styled-system',
	jsxFramework: 'react',
});
