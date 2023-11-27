/**
 *
 * @example
 * pascalToSentenceCase('HelloWorld') // Hello World
 *
 */
export function pascalToSentenceCase(value: string) {
	return value.replace(/([A-Z])/g, " $1").trim();
}
