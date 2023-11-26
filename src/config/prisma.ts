import {PrismaClient} from '@prisma/client';

const g = globalThis as unknown as {prisma: PrismaClient};

export const prisma = g.prisma ?? new PrismaClient();

if (process.env.NODE_ENV === 'production') {
	/* skip */
} else {
	g.prisma = prisma;
}
