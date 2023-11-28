import {prisma} from "@/config/prisma";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import assert from "assert";
import JSZip from "jszip";
import {cookies} from "next/headers";
import slugify from "slugify";
import * as XLSX from "xlsx";

export async function GET(request: Request) {
	const id = cookies().get("user")?.value;
	const url = new URL(request.url);
	const name = slugify(url.searchParams.get("filename") ?? "expenses");

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

	const zip = new JSZip();

	zip.file(
		`${name}.xlsx`,
		XLSX.write(workbook, {type: "buffer", bookType: "xlsx"}),
	);

	const buffer = await zip.generateAsync({type: "blob"});
	const headers = new Headers();

	headers.append("Content-Type", "application/zip");
	headers.append("Content-Disposition", `attachment; filename="${name}.zip"`);

	return new Response(buffer, {headers});
}
