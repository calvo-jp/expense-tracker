export function getInitials(name: string, fallback = "") {
	const r = name.trim().toUpperCase().split(/\s/g);
	const l = r.length;

	if (l <= 0) return fallback;
	if (l >= 2) return `${r[0].charAt(0)}${r[l - 1].charAt(0)}`.trim();
	return r[0].charAt(0);
}
