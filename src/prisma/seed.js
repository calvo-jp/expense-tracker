// @ts-check

const {PrismaClient, ExpenseCategory} = require("@prisma/client");
const {subYears} = require("date-fns");
const {faker} = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
	await prisma.$runCommandRaw({
		dropDatabase: 1,
	});

	const user = await prisma.user.create({
		data: {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			username: "guest",
			password: await bcrypt.hash("password", await bcrypt.genSalt(16)),
		},
	});

	const today = new Date();

	await prisma.expense.createMany({
		data: Array.from({length: 125}).map(() => ({
			userId: user.id,
			amount: faker.number.float({
				min: 100,
				max: 100000,
				precision: 0.1,
			}),
			category: faker.helpers.arrayElement(Object.values(ExpenseCategory)),
			location: faker.location.city(),
			description: faker.word.words(),
			transactionDate: faker.date.between({
				to: today,
				from: subYears(today, 2),
			}),
		})),
	});
}

main()
	.catch(console.error)
	.finally(async () => {
		await prisma.$disconnect();
	});
