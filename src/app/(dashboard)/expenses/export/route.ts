import {prisma} from "@/config/prisma";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import assert from "assert";
import {format} from "date-fns";
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

	const data = expenses.map((obj) => ({
		Category: pascalToSentenceCase(obj.category),
		Description: obj.description,
		Amount: obj.amount,
		Location: obj.location,
		"Transaction Date": format(obj.transactionDate, "yyyy MMM dd hh:mm a"),
	}));

	const workbook = XLSX.utils.book_new();
	const worksheet = XLSX.utils.json_to_sheet(data);

	worksheet["!cols"] = [
		{width: 20},
		{width: 25},
		{width: 20},
		{width: 25},
		{width: 20},
	];

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
