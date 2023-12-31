import {Prisma} from "@prisma/client";
import {TExpenseFilterSchema} from "./schema";

export function paramsToWhereClause(args: TExpenseFilterSchema) {
	const {
		category,
		location,
		minAmount,
		maxAmount,
		transactionDateStart,
		transactionDateUntil,
	} = args;

	return {
		...([minAmount, maxAmount].some(Boolean) && {
			amount: {
				...(minAmount && {gte: minAmount}),
				...(maxAmount && {lte: maxAmount}),
			},
		}),

		...(category?.length && {
			category: {in: category},
		}),

		...(location && {
			location: {contains: location},
		}),

		...([transactionDateStart, transactionDateUntil].some(Boolean) && {
			transactionDate: {
				...(transactionDateStart && {gte: transactionDateStart}),
				...(transactionDateUntil && {lte: transactionDateUntil}),
			},
		}),
	} satisfies Prisma.ExpenseWhereInput;
}
