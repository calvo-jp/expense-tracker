import {ExpenseCategory} from "@prisma/client";

export interface Data {
	key: string;
	amount: number;
	category: ExpenseCategory;
	meta:
		| {
				type: "month";
				index: number;
		  }
		| {
				type: "week";
				index: number;
		  }
		| {
				type: "day";
				index: number;
		  };
}
