export function omit<T extends Record<string, unknown>, K extends keyof T>(
	input: T,
	keys: K[],
): Omit<T, K> {
	const o = Object.assign({}, input);
	const l = new Set(keys);

	l.forEach((k) => {
		if (o[k]) {
			delete o[k];
		}
	});

	return o;
}
