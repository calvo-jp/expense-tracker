export const currencyFormatter = {
	format(value: number, currency?: string) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency ?? 'USD',
			minimumFractionDigits: 1,
			maximumFractionDigits: 2,
		}).format(value);
	},
};
