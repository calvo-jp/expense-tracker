"use client";

import {styled} from "@/styled-system/jsx";
import {datePicker} from "@/styled-system/recipes";
import {createStyleContext} from "@/utils/create-style-context";
import {DatePicker as parts} from "@ark-ui/react";

const {withProvider, withContext} = createStyleContext(datePicker);

export const DatePicker = withProvider(
	styled(
		parts.Root,
		{},
		{
			defaultProps: {
				lazyMount: true,
			},
		},
	),
	"root",
);

export const DatePickerClearTrigger = withContext(
	styled(parts.ClearTrigger),
	"clearTrigger",
);
export const DatePickerContent = withContext(
	styled(parts.Content, {
		base: {
			shadow: "none",
			borderWidth: "1px",
		},
	}),
	"content",
);
export const DatePickerControl = withContext(styled(parts.Control), "control");
export const DatePickerInput = withContext(styled(parts.Input), "input");
export const DatePickerLabel = withContext(styled(parts.Label), "label");
export const DatePickerMonthSelect = withContext(
	styled(parts.MonthSelect),
	"monthSelect",
);
export const DatePickerNextTrigger = withContext(
	styled(parts.NextTrigger),
	"nextTrigger",
);
export const DatePickerPositioner = withContext(
	styled(parts.Positioner),
	"positioner",
);
export const DatePickerPrevTrigger = withContext(
	styled(parts.PrevTrigger),
	"prevTrigger",
);
export const DatePickerRangeText = withContext(
	styled(parts.RangeText),
	"rangeText",
);
export const DatePickerTable = withContext(styled(parts.Table), "table");
export const DatePickerTableBody = withContext(
	styled(parts.TableBody),
	"tableBody",
);
export const DatePickerTableCell = withContext(
	styled(parts.TableCell),
	"tableCell",
);
export const DatePickerTableCellTrigger = withContext(
	styled(parts.TableCellTrigger),
	"tableCellTrigger",
);
export const DatePickerTableHead = withContext(
	styled(parts.TableHead),
	"tableHead",
);
export const DatePickerTableHeader = withContext(
	styled(parts.TableHeader),
	"tableHeader",
);
export const DatePickerTableRow = withContext(
	styled(parts.TableRow),
	"tableRow",
);
export const DatePickerTrigger = withContext(styled(parts.Trigger), "trigger");
export const DatePickerView = withContext(styled(parts.View), "view");
export const DatePickerViewControl = withContext(
	styled(parts.ViewControl),
	"viewControl",
);
export const DatePickerViewTrigger = withContext(
	styled(parts.ViewTrigger),
	"viewTrigger",
);
export const DatePickerYearSelect = withContext(
	styled(parts.YearSelect),
	"yearSelect",
);
