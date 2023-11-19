'use client';

import {styled} from '@/styled-system/jsx';
import {numberInput} from '@/styled-system/recipes';
import {createStyleContext} from '@/utils/create-style-context';
import {NumberInput as parts} from '@ark-ui/react';

const {withProvider, withContext} = createStyleContext(numberInput);

export const NumberInput = withProvider(styled(parts.Root), 'root');
export const NumberInputControl = withContext(styled(parts.Control), 'control');
export const NumberInputDecrementTrigger = withContext(
	styled(parts.DecrementTrigger),
	'decrementTrigger',
);
export const NumberInputInput = withContext(styled(parts.Input), 'input');
export const NumberInputIncrementTrigger = withContext(
	styled(parts.IncrementTrigger),
	'incrementTrigger',
);
export const NumberInputLabel = withContext(styled(parts.Label), 'label');
export const NumberInputScrubber = withContext(styled(parts.Scrubber), 'scrubber');
