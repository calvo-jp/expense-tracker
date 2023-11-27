import {PrismaClient} from "@prisma/client";

const g = globalThis as unknown as {prisma: PrismaClient};
const i = g.prisma ?? new PrismaClient();

if (process.env.NODE_ENV === "development") g.prisma = i;

export const prisma = i;
