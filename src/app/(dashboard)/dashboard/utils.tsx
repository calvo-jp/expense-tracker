import {token} from "@/styled-system/tokens";
import {ExpenseCategory} from "@prisma/client";

export const BACKGROUND_COLOR_MAP = {
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

export const FOREGROUND_COLOR_MAP = {
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
