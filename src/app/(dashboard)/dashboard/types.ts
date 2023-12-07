import {ExpenseCategory} from "@prisma/client";

export interface MonthData {
	month: string;
	index: number;
	total: number;
	category: ExpenseCategory;
}

export interface WeekData {
	week: string;
	index: number;
	total: number;
	category: ExpenseCategory;
}

export interface DayData {
	day: string;
	index: string;
	total: string;
	category: ExpenseCategory;
}
