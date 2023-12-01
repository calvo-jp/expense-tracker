"use client";

import {AspectRatio, Box, Grid} from "@/styled-system/jsx";
import {token} from "@/styled-system/tokens";
import {numberFormatter} from "@/utils/number-formatter";
import {pascalToSentenceCase} from "@/utils/pascal-to-sentence-case";
import {ExpenseCategory} from "@prisma/client";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {FOREGROUND_COLOR_MAP} from "./utils";

const data = [
	{
		name: "Jan",
		[ExpenseCategory.Food]: 4000,
		[ExpenseCategory.Clothing]: 2400,
		[ExpenseCategory.DebtsPayment]: 2400,
	},
	{
		name: "Feb",
		[ExpenseCategory.Food]: 3000,
		[ExpenseCategory.Clothing]: 1398,
		[ExpenseCategory.DebtsPayment]: 2400,
	},
	{
		name: "Mar",
		[ExpenseCategory.Food]: 2000,
		[ExpenseCategory.Clothing]: 9800,
		[ExpenseCategory.DebtsPayment]: 2300,
	},
	{
		name: "Apr",
		[ExpenseCategory.Food]: 2780,
		[ExpenseCategory.Clothing]: 3908,
		[ExpenseCategory.DebtsPayment]: 0,
	},
	{
		name: "May",
		[ExpenseCategory.Food]: 1890,
		[ExpenseCategory.Clothing]: 4800,
		[ExpenseCategory.DebtsPayment]: 1500,
	},
	{
		name: "Jul",
		[ExpenseCategory.Food]: 2390,
		[ExpenseCategory.Clothing]: 3800,
		[ExpenseCategory.DebtsPayment]: 150,
	},
	{
		name: "Aug",
		[ExpenseCategory.Food]: 3490,
		[ExpenseCategory.Clothing]: 4300,
		[ExpenseCategory.DebtsPayment]: 2400,
	},
];

export function AnnualReport() {
	return (
		<>
			<AspectRatio w="full" ratio={16 / 5} mt={5}>
				<ResponsiveContainer
					width={token("sizes.full")}
					height={token("sizes.full")}
				>
					<LineChart
						data={data}
						margin={{
							top: 0,
							left: 0,
							right: 8,
							bottom: 0,
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
										<Box fontWeight="medium">{getMonthFullName(label)}</Box>
										<Grid mt={2} columns={2} fontSize="sm" lineHeight="normal">
											<Box>
												{payload.map(({name}, index) => (
													<Box key={`${name}${index}`}>
														{pascalToSentenceCase(name as unknown as string)}
													</Box>
												))}
												<Box>Total</Box>
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

						{Object.values(ExpenseCategory).map((category) => (
							<Line
								key={category}
								type="monotone"
								dataKey={category}
								stroke={FOREGROUND_COLOR_MAP[category]}
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
