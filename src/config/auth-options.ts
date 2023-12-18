import {mailto} from "@/utils/mailto";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {PrismaClient, User} from "@prisma/client";
import {AuthOptions} from "next-auth";
import {prisma} from "./prisma";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma as unknown as PrismaClient),
	providers: [
		{
			id: "email",
			type: "email",
			name: "Email",
			from: "calvojp92@gmail.com",
			maxAge: 3 * 24 * 60 * 60,
			server: null,
			options: {},
			async sendVerificationRequest({identifier, url}) {
				await mailto({
					subject: "You're almost there! 🚀",
					content: `<a href="${url}">Click here</a>`,
					sender: "calvojp92@gmail.com",
					to: identifier,
				});
			},
		},
	],
	callbacks: {
		async signIn({user: {email}}) {
			return email ? await prisma.user.exists({email}) : false;
		},
		async session({session, user}) {
			session.user = user as unknown as User;

			return session;
		},
	},
	pages: {
		error: "/login",
		signIn: "/login",
	},
};
