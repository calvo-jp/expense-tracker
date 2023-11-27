// @ts-check

const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

async function generateCurrencyConstant() {
	const response = await fetch("https://restcountries.com/v3.1/all");

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

	const formatted = await prettier.format(contents, {
		...(await prettier.resolveConfig(process.cwd())),
		parser: "typescript",
	});

	try {
		fs.mkdirSync(directory, {recursive: true});
	} catch {
	} finally {
		fs.writeFileSync(filepath, formatted);
	}
}

generateCurrencyConstant();
