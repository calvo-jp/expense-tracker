import {Prisma, PrismaClient} from "@prisma/client";

function createPrismaClient() {
	return new PrismaClient().$extends({
		model: {
			$allModels: {
				async exists<T>(
					this: T,
					where: Prisma.Args<T, "findFirst">["where"],
				): Promise<boolean> {
					const context = Prisma.getExtensionContext(this);
					const result = await (context as any).findFirst({where});

					return result !== null;
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
