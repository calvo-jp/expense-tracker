"use client";

import {AspectRatio, Box, Flex, Grid} from "@/styled-system/jsx";
import {token} from "@/styled-system/tokens";
import {formatNumber} from "@/utils/format-number";
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
import {DayData, MonthData, WeekData} from "./types";

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

interface ExpensesPerCategoryGraphProps {
	data: MonthData[] | WeekData[] | DayData[];
}

export function ExpensesPerCategoryGraph(props: ExpensesPerCategoryGraphProps) {
	return (
		<AspectRatio w="full" maxH="26rem" ratio={16 / 8}>
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
													{formatNumber(value as unknown as number)}
												</Box>
											))}
											<Box textAlign="right">{formatNumber(total)}</Box>
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

const BACKGROUND_COLOR_MAP = {
	[ExpenseCategory.Clothing]: token("colors.amber.a8"),
	[ExpenseCategory.DebtsPayment]: token("colors.purple.a8"),
	[ExpenseCategory.Education]: token("colors.blue.a8"),
	[ExpenseCategory.Entertainment]: token("colors.bronze.a8"),
	[ExpenseCategory.Food]: token("colors.brown.a8"),
	[ExpenseCategory.Healthcare]: token("colors.crimson.a8"),
	[ExpenseCategory.Housing]: token("colors.gold.a8"),
	[ExpenseCategory.Insurance]: token("colors.green.a8"),
	[ExpenseCategory.Miscellaneous]: token("colors.iris.a8"),
	[ExpenseCategory.Others]: token("colors.cyan.a8"),
	[ExpenseCategory.PersonalCare]: token("colors.indigo.a8"),
	[ExpenseCategory.Savings]: token("colors.jade.a8"),
	[ExpenseCategory.Transportation]: token("colors.lime.a8"),
	[ExpenseCategory.Utilities]: token("colors.ruby.a8"),
};

const FOREGROUND_COLOR_MAP = {
	[ExpenseCategory.Clothing]: token("colors.amber.a7"),
	[ExpenseCategory.DebtsPayment]: token("colors.purple.a7"),
	[ExpenseCategory.Education]: token("colors.blue.a7"),
	[ExpenseCategory.Entertainment]: token("colors.bronze.a7"),
	[ExpenseCategory.Food]: token("colors.brown.a7"),
	[ExpenseCategory.Healthcare]: token("colors.crimson.a7"),
	[ExpenseCategory.Housing]: token("colors.gold.a7"),
	[ExpenseCategory.Insurance]: token("colors.green.a7"),
	[ExpenseCategory.Miscellaneous]: token("colors.iris.a7"),
	[ExpenseCategory.Others]: token("colors.cyan.a7"),
	[ExpenseCategory.PersonalCare]: token("colors.indigo.a7"),
	[ExpenseCategory.Savings]: token("colors.jade.a7"),
	[ExpenseCategory.Transportation]: token("colors.lime.a7"),
	[ExpenseCategory.Utilities]: token("colors.ruby.a7"),
};
