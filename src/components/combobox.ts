import {styled} from '@/styled-system/jsx';
import {combobox} from '@/styled-system/recipes';
import {createStyleContext} from '@/utils/create-style-context';
import {Combobox as parts} from '@ark-ui/react';

const {withProvider, withContext} = createStyleContext(combobox);

export const Combobox = withProvider(
	styled(
		parts.Root,
		{},
		{
			defaultProps: {
				loop: true,
				items: [],
				lazyMount: true,
				positioning: {
					sameWidth: true,
				},
			},
		},
	),
	'root',
);

export const ComboboxClearTrigger = withContext(
	styled(parts.ClearTrigger),
	'clearTrigger',
);
export const ComboboxContent = withContext(styled(parts.Content), 'content');
export const ComboboxControl = withContext(styled(parts.Control), 'control');
export const ComboboxInput = withContext(styled(parts.Input), 'input');
export const ComboboxItem = withContext(styled(parts.Item), 'item');
export const ComboboxItemGroup = withContext(
	styled(parts.ItemGroup),
	'itemGroup',
);
export const ComboboxItemGroupLabel = withContext(
	styled(parts.ItemGroupLabel),
	'itemGroupLabel',
);
export const ComboboxItemIndicator = withContext(
	styled(parts.ItemIndicator),
	'itemIndicator',
);
export const ComboboxItemText = withContext(styled(parts.ItemText), 'itemText');
export const ComboboxLabel = withContext(styled(parts.Label), 'label');
export const ComboboxPositioner = withContext(
	styled(parts.Positioner),
	'positioner',
);
export const ComboboxTrigger = withContext(styled(parts.Trigger), 'trigger');
