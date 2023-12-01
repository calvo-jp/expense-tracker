import {defineConfig} from "@pandacss/dev";

export default defineConfig({
	preflight: true,
	presets: ["@pandacss/preset-base", "@park-ui/panda-preset"],
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
				},
			},
		},
	},
	conditions: {
		dark: "@media (prefers-color-scheme: dark)",
	},
	outdir: "src/styled-system",
	jsxFramework: "react",
});
