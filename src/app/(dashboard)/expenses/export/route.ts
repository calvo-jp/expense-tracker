import {prisma} from "@/config/prisma";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import assert from "assert";
import {cookies} from "next/headers";
import slugify from "slugify";
import * as XLSX from "xlsx";
import {ExpenseFilterSchema} from "../schema";
import {paramsToWhereClause} from "../utils.server";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const userId = cookies().get("user")?.value;
	const filename = slugify(url.searchParams.get("filename") ?? "expenses", {
		lower: true,
	});

	assert(userId);

	const expenses = await prisma.expense.findMany({
		where: {
			userId,

			...paramsToWhereClause(
				ExpenseFilterSchema.parse({
					category: url.searchParams.getAll("category"),
					location: url.searchParams.get("location"),
					minAmount: url.searchParams.get("minAmount"),
					maxAmount: url.searchParams.get("maxAmount"),
					transactionDateStart: url.searchParams.get("transactionDateStart"),
					transactionDateUntil: url.searchParams.get("transactionDateUntil"),
				}),
			),
		},
		select: {
			amount: true,
			category: true,
			location: true,
			description: true,
			transactionDate: true,
		},
	});

	const data = expenses.map((o) => ({
		Category: pascalToSentenceCase(o.category),
		Description: o.description,
		Location: o.location,
		Amount: o.amount,
		"Transaction Date": o.transactionDate,
	}));

	const workbook = XLSX.utils.book_new();
	const worksheet = XLSX.utils.json_to_sheet(data);

	XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

	const buffer = XLSX.write(workbook, {type: "buffer", bookType: "xlsx"});
	const headers = new Headers();

	headers.append(
		"Content-Disposition",
		`attachment; filename="${filename}.xlsx"`,
	);

	headers.append(
		"Content-Type",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	);

	return new Response(buffer, {headers});
}
