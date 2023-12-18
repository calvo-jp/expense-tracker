import assert from "assert";

assert(process.env.BREVO_API_KEY);
assert(process.env.BREVO_API_URL);

const brevoApiKey = process.env.BREVO_API_KEY;
const brevoApiUrl = process.env.BREVO_API_URL;

type Email =
	| string
	| {
			name?: string;
			email: string;
	  };

interface MailtoInput {
	subject: string;
	content: string;
	sender: Email;
	to: Email[] | Email;
}

export async function mailto(input: MailtoInput) {
	const data: Record<string, unknown> = {};

	data.htmlContent = input.content;
	data.subject = input.subject;
	data.sender = normalizeEmail(input.sender);
	data.to = Array.isArray(input.to)
		? input.to.map(normalizeEmail)
		: [normalizeEmail(input.to)];

	const response = await fetch(brevoApiUrl + "/smtp/email", {
		body: JSON.stringify(data),
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"API-KEY": brevoApiKey,
		},
	});

	return await response.json();
}

function normalizeEmail(email: Email) {
	return typeof email === "string" ? {email} : email;
}
