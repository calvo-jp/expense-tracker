import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import {Plugin, unified} from "unified";
import {matter} from "vfile-matter";

const frontmatterParserPlugin: Plugin = () => {
	return function parseFrontmatter(_, file) {
		matter(file, {
			strip: true,
		});
	};
};

const processor = unified()
	.use(remarkParse)
	.use(remarkFrontmatter)
	.use(frontmatterParserPlugin)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeStringify);

interface Dict {
	[key: string]: string | undefined;
}

export async function markdownToHtml(markdown: string) {
	const vfile = await processor.process(markdown);
	const html = vfile.toString();
	const meta = vfile.data?.matter as Dict;

	return {
		html,
		meta,
	};
}
