"use client";

import {AspectRatio, Box, Flex, Grid} from "@/styled-system/jsx";
import {token} from "@/styled-system/tokens";
import {numberFormatter} from "@/utils/number-formatter";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import {ExpenseCategory} from "@prisma/client";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {BACKGROUND_COLOR_MAP, FOREGROUND_COLOR_MAP} from "./utils";

function randInt(max: number, min: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const data = [
	{
		name: "Jan",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
	{
		name: "Feb",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
	{
		name: "Mar",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
	{
		name: "Apr",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
	{
		name: "May",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
	{
		name: "Jun",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
	{
		name: "Jul",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
	{
		name: "Aug",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
	{
		name: "Sep",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
	{
		name: "Oct",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
	{
		name: "Nov",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
	{
		name: "Dec",
		[ExpenseCategory.Clothing]: randInt(10000, 0),
		[ExpenseCategory.DebtsPayment]: randInt(10000, 0),
		[ExpenseCategory.Education]: randInt(10000, 0),
		[ExpenseCategory.Entertainment]: randInt(10000, 0),
		[ExpenseCategory.Food]: randInt(10000, 0),
		[ExpenseCategory.Healthcare]: randInt(10000, 0),
		[ExpenseCategory.Housing]: randInt(10000, 0),
		[ExpenseCategory.Insurance]: randInt(10000, 0),
		[ExpenseCategory.Miscellaneous]: randInt(10000, 0),
		[ExpenseCategory.Others]: randInt(10000, 0),
		[ExpenseCategory.PersonalCare]: randInt(10000, 0),
		[ExpenseCategory.Savings]: randInt(10000, 0),
		[ExpenseCategory.Transportation]: randInt(10000, 0),
		[ExpenseCategory.Utilities]: randInt(10000, 0),
	},
];

export function ExpensesPerCategoryGraph() {
	return (
		<>
			<AspectRatio w="full" ratio={16 / 8} mt={5}>
				<ResponsiveContainer
					width={token("sizes.full")}
					height={token("sizes.full")}
				>
					<LineChart
						data={data}
						margin={{
							top: 8,
							left: 8,
							right: 8,
							bottom: 8,
						}}
					>
						<CartesianGrid stroke={token("colors.border.muted")} />
						<XAxis
							dataKey="name"
							style={{
								fontSize: token("fontSizes.sm"),
							}}
						/>
						<YAxis
							style={{
								fontFamily: token("fonts.mono"),
								fontSize: token("fontSizes.sm"),
							}}
						/>
						<Tooltip
							content={({payload = [], label}) => {
								const total = payload.reduce((t, e) => {
									return t + (e.value as unknown as number);
								}, 0);

								return (
									<Box
										p={4}
										bg="bg.subtle"
										rounded="sm"
										border="1px solid token(colors.border.default)"
									>
										<Box fontSize="sm" fontWeight="medium">
											{getMonthFullName(label)}
										</Box>

										<Grid mt={2} columns={2} fontSize="xs" lineHeight="normal">
											<Box>
												{payload.map(({name}, index) => (
													<Flex
														key={`${name}${index}`}
														gap={1.5}
														alignItems="center"
													>
														<Box
															w={3}
															h={2}
															flexShrink={0}
															style={{
																background:
																	BACKGROUND_COLOR_MAP[name as ExpenseCategory],
															}}
														/>
														<Box>
															{pascalToSentenceCase(name as unknown as string)}
														</Box>
													</Flex>
												))}
												<Flex gap={1.5} alignItems="center">
													<Box w={3} h={2} bg="bg.emphasized" flexShrink={0} />
													<Box>Total</Box>
												</Flex>
											</Box>

											<Box fontFamily="mono">
												{payload.map(({name, value}, index) => (
													<Box key={`${name}${index}`} textAlign="right">
														{numberFormatter.format(value as unknown as number)}
													</Box>
												))}
												<Box textAlign="right">
													{numberFormatter.format(total)}
												</Box>
											</Box>
										</Grid>
									</Box>
								);
							}}
						/>

						<Legend
							content={({payload = []}) => {
								return (
									<Flex
										pt={8}
										w="75%"
										mx="auto"
										fontSize="xs"
										flexWrap="wrap"
										columnGap={2.5}
										justifyContent="center"
									>
										{payload.map((entry, index) => (
											<Flex key={index} alignItems="center" gap={1}>
												<Box
													w={2}
													h={1.5}
													style={{
														background: entry.color,
													}}
												/>
												<Box>{pascalToSentenceCase(entry.value)}</Box>
											</Flex>
										))}
									</Flex>
								);
							}}
						/>

						{Object.values(ExpenseCategory).map((category) => (
							<Line
								key={category}
								type="basis"
								dataKey={category}
								stroke={FOREGROUND_COLOR_MAP[category]}
								dot={false}
							/>
						))}
					</LineChart>
				</ResponsiveContainer>
			</AspectRatio>
		</>
	);
}

function getMonthFullName(shortName: string) {
	return {
		Jan: "January",
		Feb: "February",
		Mar: "March",
		Apr: "April",
		May: "May",
		Jun: "June",
		Jul: "July",
		Aug: "August",
		Sep: "September",
		Oct: "October",
		Nov: "November",
		Dec: "December",
	}[shortName];
}
