import {cache} from "react";

export const getCurrentLocation = cache(async () => {
	try {
		const resp = await fetch("https://ipapi.co/json");
		const data = await resp.json();

		return [data?.city, data?.country_name].filter(Boolean).join(", ");
	} catch {
		return "";
	}
});
