interface PrismaStandardEnum {
	[key: string]: string;
}

/**
 *
 * Convert strings to valid prisma enum. This exists due to prisma's enum limitation
 *
 * @see
 * https://github.com/prisma/prisma/issues/12405
 *
 * @example
 * stringToPrismaEnum(Object.values(YourEnum), "Sample value") // SampleValue
 *
 */
export function stringToPrismaEnum<T extends PrismaStandardEnum>(
	enum_: T,
	value: unknown,
) {
	if (typeof value !== "string") return;

	const l = Object.values(enum_);
	const e = l.find((i) => normalize(i) === normalize(value));

	return e as keyof T | undefined;
}

const normalize = (s: string) => s.toLowerCase().replace(/\s/g, "");
