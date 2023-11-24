export function pick<T extends Record<string, unknown>, K extends keyof T>(
	input: T,
	keys: K[],
) {
	const o: Partial<Pick<T, K>> = {};
	const l = new Set(keys);

	l.forEach((k) => {
		if (input[k]) {
			o[k] = input[k];
		}
	});

	return o as Pick<T, K>;
}
