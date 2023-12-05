const formatter = new Intl.NumberFormat("en-US", {
	minimumFractionDigits: 1,
	maximumFractionDigits: 2,
});

export function formatNumber(value: number | bigint) {
	return formatter.format(value);
}
