import {Prisma, PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

function createPrismaClient() {
	return new PrismaClient().$extends({
		model: {
			$allModels: {
				async exists<T>(this: T, where: Prisma.Args<T, "findFirst">["where"]) {
					const context = Prisma.getExtensionContext(this) as any;
					const result = await context.findFirst({where});
					return result !== null;
				},
			},
		},

		query: {
			user: {
				async $allOperations({args, query, operation}) {
					if (operation === "create" || operation === "update") {
						if (args.data.password) {
							args.data.password = await bcrypt.hash(
								args.data.password.toString(),
								await bcrypt.genSalt(8),
							);
						}
					}

					return query(args);
				},
			},
		},
	});
}

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const global_ = globalThis as unknown as {prisma: ExtendedPrismaClient};
const prisma_ = global_.prisma ?? createPrismaClient();

if (process.env.NODE_ENV === "development") global_.prisma = prisma_;

export const prisma = prisma_;
