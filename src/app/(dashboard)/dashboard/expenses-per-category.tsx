import {Box} from "@/styled-system/jsx";
import {ExpensesPerCategoryGraph} from "./expenses-per-category-graph";
import {Duration} from "./utils";

interface ExpensesPerCategoryProps {
	duration: Duration;
}

export async function ExpensesPerCategory(props: ExpensesPerCategoryProps) {
	// TODO
	// raw mongodb aggregate query

	return (
		<Box
			py={12}
			pr={10}
			pl={5}
			bg="gray.a2"
			border="1px solid token(colors.gray.a4)"
			rounded="sm"
		>
			<ExpensesPerCategoryGraph />
		</Box>
	);
}
