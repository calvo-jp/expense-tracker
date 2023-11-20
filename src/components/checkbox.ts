'use client';

import {styled} from '@/styled-system/jsx';
import {checkbox} from '@/styled-system/recipes';
import {createStyleContext} from '@/utils/create-style-context';
import {Checkbox as parts} from '@ark-ui/react';

const {withProvider, withContext} = createStyleContext(checkbox);

export const Checkbox = withProvider(styled(parts.Root), 'root');
export const CheckboxControl = withContext(styled(parts.Control), 'control');
export const CheckboxLabel = withContext(styled(parts.Label), 'label');
