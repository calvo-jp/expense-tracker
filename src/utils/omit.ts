interface Dict {
	[key: string]: unknown;
}

export function omit<T extends Dict, K extends keyof T>(subject: T, keys: K[]) {
	const o = {...subject};

	keys.forEach((k) => {
		if (o[k]) {
			delete o[k];
		}
	});

	return o as Omit<T, K>;
}
