import {prisma} from "@/config/prisma";
import {omit} from "@/utils/omit";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import {AuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma as unknown as PrismaClient),
	providers: [
		Credentials({
			credentials: {
				username: {},
				password: {},
			},
			async authorize(credentials) {
				const {username, password} = schema.parse(credentials);

				const user = await prisma.user.findUniqueOrThrow({
					where: {
						username,
					},
				});

				return (await bcrypt.compare(password, user.password))
					? omit(user, ["password"])
					: null;
			},
		}),
	],
	pages: {
		error: "/login",
		signIn: "/login",
		signOut: "/login",
	},
};

const schema = z.object({
	username: z.string(),
	password: z.string(),
});
