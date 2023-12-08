export async function getCurrentLocation() {
	try {
		const resp = await fetch("https://ipapi.co/json");
		const data = await resp.json();

		return [data?.city, data?.country_name].filter(Boolean).join(", ");
	} catch {
		return "";
	}
}
