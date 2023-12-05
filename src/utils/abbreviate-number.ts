const formatter = new Intl.NumberFormat("en-US", {
	notation: "compact",
	compactDisplay: "short",
});

export function abbreviateNumber(value: number | bigint) {
	return formatter.format(value);
}
