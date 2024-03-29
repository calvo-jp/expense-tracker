import {defineConfig} from "@pandacss/dev";
import {createPreset} from "@park-ui/panda-preset";

export default defineConfig({
	preflight: true,
	presets: [
		"@pandacss/preset-base",
		createPreset({
			grayColor: "slate",
			accentColor: "iris",
		}),
	],
	include: ["./src/**/*.{ts,tsx}"],
	exclude: [],
	theme: {
		extend: {
			tokens: {
				fonts: {
					body: {
						value: "var(--font-body)",
					},
					heading: {
						value: "var(--font-heading)",
					},
					mono: {
						value: "var(--font-mono)",
					},
				},
				sizes: {
					navbar: {
						height: {
							value: "{spacing.20}",
						},
					},
					sidebar: {
						width: {
							value: "{spacing.64}",
						},
					},
					"1/4": {value: "25%"},
					"1/3": {value: "33.3333333333%"},
					"1/2": {value: "50%"},
					"2/3": {value: "66.6666666667%"},
					"3/4": {value: "75%"},
				},
			},
		},
	},
	outdir: "src/styled-system",
	jsxFramework: "react",
	lightningcss: true,
});
