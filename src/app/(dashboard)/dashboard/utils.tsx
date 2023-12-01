import {token} from "@/styled-system/tokens";
import {ExpenseCategory} from "@prisma/client";

export const BACKGROUND_COLOR_MAP = {
	[ExpenseCategory.Clothing]: token("colors.amber.a4"),
	[ExpenseCategory.DebtsPayment]: token("colors.purple.a4"),
	[ExpenseCategory.Education]: token("colors.blue.a4"),
	[ExpenseCategory.Entertainment]: token("colors.bronze.a4"),
	[ExpenseCategory.Food]: token("colors.brown.a4"),
	[ExpenseCategory.Healthcare]: token("colors.crimson.a4"),
	[ExpenseCategory.Housing]: token("colors.gold.a4"),
	[ExpenseCategory.Insurance]: token("colors.green.a4"),
	[ExpenseCategory.Miscellaneous]: token("colors.iris.a4"),
	[ExpenseCategory.Others]: token("colors.cyan.a4"),
	[ExpenseCategory.PersonalCare]: token("colors.indigo.a4"),
	[ExpenseCategory.Savings]: token("colors.jade.a4"),
	[ExpenseCategory.Transportation]: token("colors.lime.a4"),
	[ExpenseCategory.Utilities]: token("colors.ruby.a4"),
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
