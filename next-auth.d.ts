import {Pretty} from "@/styled-system/types";
import {User} from "@prisma/client";
import "next-auth";

declare module "next-auth" {
	interface Session {
		user: Pretty<Omit<User, "password">>;
	}
}
