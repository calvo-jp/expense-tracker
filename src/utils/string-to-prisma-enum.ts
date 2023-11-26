interface PrismaStandardEnum {
	[key: string]: string;
}

/**
 *
 * Convert strings to valid prisma enum
 *
 * @example
 * stringToPrismaEnum(Object.values(YourEnum), "Sample value") // SampleValue
 *
 */
export function stringToPrismaEnum<T extends PrismaStandardEnum>(
	enum_: T,
	value: string,
) {
	const l = Object.values(enum_);
	const e = l.find((i) => normalize(i) === normalize(value));

	return e;
}

const normalize = (s: string) => s.toLowerCase().replace(/\s/g, '');
