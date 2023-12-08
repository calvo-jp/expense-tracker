import {
	endOfMonth,
	endOfWeek,
	endOfYear,
	startOfMonth,
	startOfWeek,
	startOfYear,
	subMonths,
	subWeeks,
	subYears,
} from "date-fns";
import {z} from "zod";

export interface DateRange {
	start: Date;
	until: Date;
}

export enum Duration {
	ThisWeek = "ThisWeek",
	LastWeek = "LastWeek",
	ThisMonth = "ThisMonth",
	LastMonth = "LastMonth",
	ThisYear = "ThisYear",
	LastYear = "LastYear",
}

export function getDurationValue(duration: Duration): DateRange {
	const today = new Date();
	const lastWeekFromToday = subWeeks(today, 1);
	const lastMonthFromToday = subMonths(today, 1);
	const lastYearFromToday = subYears(today, 1);

	const map: Record<Duration, DateRange> = {
		[Duration.ThisYear]: {
			start: startOfYear(today),
			until: endOfYear(today),
		},
		[Duration.LastYear]: {
			start: startOfYear(lastYearFromToday),
			until: endOfYear(lastYearFromToday),
		},
		[Duration.ThisMonth]: {
			start: startOfMonth(today),
			until: endOfMonth(today),
		},
		[Duration.LastMonth]: {
			start: startOfMonth(lastMonthFromToday),
			until: endOfMonth(lastMonthFromToday),
		},
		[Duration.ThisWeek]: {
			start: startOfWeek(today),
			until: endOfWeek(today),
		},
		[Duration.LastWeek]: {
			start: startOfWeek(lastWeekFromToday),
			until: endOfWeek(lastWeekFromToday),
		},
	};

	return map[duration];
}

export const DurationSchema = z
	.object({
		q: z
			.union([z.nativeEnum(Duration), z.array(z.nativeEnum(Duration))])
			.transform((v) => (Array.isArray(v) ? v[0] : v))
			.catch(() => Duration.ThisYear),
	})
	.catch(() => ({
		q: Duration.ThisYear,
	}));

export function parseDuration(searchParams: unknown) {
	return DurationSchema.parse(searchParams).q;
}
