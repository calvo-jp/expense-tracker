import {PrismaClient} from '@prisma/client';

const globalThis_ = globalThis as unknown as {prisma: PrismaClient};

export const prisma = globalThis_.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis_.prisma = prisma;
