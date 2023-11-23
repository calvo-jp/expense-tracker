import {defineConfig} from '@pandacss/dev';

export default defineConfig({
	preflight: true,
	presets: ['@pandacss/preset-base', '@park-ui/panda-preset'],
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
				sizes: {
					navbar: {
						height: {
							value: '{spacing.20}',
						},
					},
					sidebar: {
						width: {
							value: '{spacing.64}',
						},
					},
				},
			},
		},
	},
	outdir: 'src/styled-system',
	jsxFramework: 'react',
});
