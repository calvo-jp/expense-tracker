interface JSON {
	[key: string]: unknown;
}

export function formdataToJson(formdata: FormData) {
	const o: JSON = {};

	formdata.forEach((v, k) => {
		o[k] = v;
	});

	return o;
}
