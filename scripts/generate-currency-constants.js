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

	const contents = `

		// Generated file
		// Last updated at ${new Date().toISOString()}

		export const currencies = ${JSON.stringify(currencies)};
		
	`;

	const prettierConfig = await prettier.resolveConfig(process.cwd());
	const formattedContents = await prettier.format(contents, {
		...prettierConfig,
		parser: "typescript",
	});

	const destDir = path.join(process.cwd(), "src/utils/constants");
	const destFile = path.join(destDir, "currencies.ts");

	try {
		await fs.mkdir(destDir, {recursive: true});
	} catch {
	} finally {
		await fs.writeFile(destFile, formattedContents);
	}
}

generateCurrencyConstants();
