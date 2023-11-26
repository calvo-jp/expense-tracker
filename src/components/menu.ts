'use client';

import {styled} from '@/styled-system/jsx';
import {menu} from '@/styled-system/recipes';
import {createStyleContext} from '@/utils/create-style-context';
import {Menu as parts} from '@ark-ui/react';

const {withProvider, withContext} = createStyleContext(menu);

export const Menu = withProvider(
	styled(
		parts.Root,
		{},
		{
			defaultProps: {
				loop: true,
				lazyMount: true,
			},
		},
	),
);

export const MenuArrow = withContext(styled(parts.Arrow), 'arrow');
export const MenuArrowTip = withContext(styled(parts.ArrowTip), 'arrowTip');
export const MenuContent = withContext(styled(parts.Content), 'content');
export const MenuContextTrigger = withContext(
	styled(parts.ContextTrigger),
	'contextTrigger',
);
export const MenuItem = withContext(styled(parts.Item), 'item');
export const MenuItemGroup = withContext(styled(parts.ItemGroup), 'itemGroup');
export const MenuItemGroupLabel = withContext(
	styled(parts.ItemGroupLabel),
	'itemGroupLabel',
);
export const MenuOptionItem = withContext(
	styled(parts.OptionItem),
	'optionItem',
);
export const MenuPositioner = withContext(
	styled(parts.Positioner),
	'positioner',
);
export const MenuSeparator = withContext(styled(parts.Separator), 'separator');
export const MenuTrigger = withContext(styled(parts.Trigger), 'trigger');
export const MenuTriggerItem = withContext(
	styled(parts.TriggerItem),
	'triggerItem',
);
