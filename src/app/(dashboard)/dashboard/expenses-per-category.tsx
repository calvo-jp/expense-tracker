import {Box, styled} from "@/styled-system/jsx";
import {ExpensesPerCategoryGraph} from "./expenses-per-category-graph";

export function ExpensesPerCategory() {
	return (
		<Box>
			<styled.h2 fontSize="lg" fontFamily="heading" fontWeight="medium">
				Expenses Per Category
			</styled.h2>

			<Box
				mt={4}
				py={12}
				pr={10}
				pl={5}
				bg="gray.a2"
				border="1px solid token(colors.gray.a4)"
				rounded="sm"
			>
				<ExpensesPerCategoryGraph />
			</Box>
		</Box>
	);
}
