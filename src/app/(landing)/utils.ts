import {markdownToHtml} from "@/utils/markdown-to-html";
import fs from "fs/promises";
import path from "path";

type MutateFn<T> = (item: Awaited<ReturnType<typeof markdownToHtml>>) => T;

export async function parseAllMarkdownFiles<T>(
	dir: string,
	mutate: MutateFn<T>,
): Promise<T[]> {
	const files = await fs.readdir(dir);

	return await Promise.all(
		files.map(async (file) => {
			const buffer = await fs.readFile(path.join(dir, file));
			const result = await markdownToHtml(buffer.toString());

			return mutate(result);
		}),
	);
}
