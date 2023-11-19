import {Button} from '@/components/button';
import {Icon} from '@/components/icon';
import {Input} from '@/components/input';
import {
	NumberInput,
	NumberInputControl,
	NumberInputDecrementTrigger,
	NumberInputIncrementTrigger,
	NumberInputInput,
} from '@/components/number-input';
import {
	Select,
	SelectContent,
	SelectControl,
	SelectItem,
	SelectItemGroup,
	SelectItemIndicator,
	SelectItemText,
	SelectPositioner,
	SelectTrigger,
	SelectValueText,
} from '@/components/select';
import {authOptions} from '@/config/auth-options';
import {styled} from '@/styled-system/jsx';
import {Portal} from '@ark-ui/react';
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	ChevronsUpDownIcon,
} from 'lucide-react';
import {getServerSession} from 'next-auth';

const items = [
	{label: 'React', value: 'react'},
	{label: 'Solid', value: 'solid'},
	{label: 'Svelte', value: 'svelte'},
	{label: 'Vue', value: 'vue'},
];

export default async function Index() {
	const session = await getServerSession(authOptions);

	return (
		<styled.div p={4}>
			<Input placeholder="Placeholder" />

			<NumberInput mt={5}>
				<NumberInputControl>
					<NumberInputInput placeholder="Placeholder" />
					<NumberInputIncrementTrigger>
						<Icon>
							<ChevronUpIcon />
						</Icon>
					</NumberInputIncrementTrigger>
					<NumberInputDecrementTrigger>
						<Icon>
							<ChevronDownIcon />
						</Icon>
					</NumberInputDecrementTrigger>
				</NumberInputControl>
			</NumberInput>

			<Select mt={5} loop positioning={{sameWidth: true}} items={items}>
				<SelectControl>
					<SelectTrigger>
						<SelectValueText placeholder="Select a Framework" />
						<Icon>
							<ChevronsUpDownIcon />
						</Icon>
					</SelectTrigger>
				</SelectControl>
				<Portal>
					<SelectPositioner>
						<SelectContent>
							<SelectItemGroup id="framework">
								{items.map((item) => (
									<SelectItem key={item.value} item={item}>
										<SelectItemText>{item.label}</SelectItemText>
										<SelectItemIndicator>
											<Icon>
												<CheckIcon />
											</Icon>
										</SelectItemIndicator>
									</SelectItem>
								))}
							</SelectItemGroup>
						</SelectContent>
					</SelectPositioner>
				</Portal>
			</Select>

			<Button mt={5}>Submit</Button>
		</styled.div>
	);
}
