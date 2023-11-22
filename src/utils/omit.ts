export function omit<T extends Record<string, unknown>, K extends keyof T>(
	input: T,
	keys: K[],
): Omit<T, K> {
	const o = {...input};

	for (const k of keys) {
		if (o[k]) {
			delete o[k];
		}
	}

	return o;
}
