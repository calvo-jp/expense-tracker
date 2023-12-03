import {Box, styled} from "@/styled-system/jsx";
import {ExpensesPerCategoryGraph} from "./expenses-per-category-graph";

export function ExpensesPerCategory() {
	return (
		<Box>
			<styled.h2 fontSize="lg" fontFamily="heading" fontWeight="medium">
				Expenses Per Category
			</styled.h2>

			<Box
				p={12}
				mt={4}
				bg="neutral.a2"
				border="1px solid token(colors.neutral.a4)"
				rounded="sm"
			>
				<ExpensesPerCategoryGraph />
			</Box>
		</Box>
	);
}
