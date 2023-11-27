import {prisma} from "@/config/prisma";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import assert from "assert";
import {cookies} from "next/headers";
import * as XLSX from "xlsx";

export async function GET() {
	const id = cookies().get("user")?.value;

	assert(id);

	const expenses = await prisma.expense.findMany({
		where: {user: {id}},
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
	headers.append("Content-Disposition", 'attachment; filename="expenses.xlsx"');
	headers.append("Content-Type", "application/vnd.ms-excel");

	return new Response(buffer, {headers});
}
