// @ts-check

const fs = require("fs/promises");
const path = require("path");
const prettier = require("prettier");

/**
 * @see https://restcountries.com/
 */
const RESTCOUNTRIES_API_V3 = "https://restcountries.com/v3.1/all";

async function generateCurrencyConstants() {
	const response = await fetch(RESTCOUNTRIES_API_V3);

	/**
	 * @type {Array<Record<string, Record<string, any>>>}
	 */
	const countries = await response.json();

	const currencies = countries
		.map((i) => i.currencies ?? {})
		.map((j) =>
			Object.entries(j).map(([abbr, {name}]) => ({
				abbr,
				name,
			})),
		)
		.flat();

	const directory = path.join(process.cwd(), "src/utils/constants");
	const filepath = path.join(directory, "currencies.ts");

	const contents = `
	/* Generated file */
	/* Last updated at ${new Date().toISOString()} */

	export const currencies = ${JSON.stringify(currencies)};
	`;

	const prettierrc = await prettier.resolveConfig(process.cwd());
	const formatted = await prettier.format(contents, {
		...prettierrc,
		parser: "typescript",
	});

	try {
		await fs.mkdir(directory, {recursive: true});
	} catch {
	} finally {
		await fs.writeFile(filepath, formatted);
	}
}

generateCurrencyConstants();
