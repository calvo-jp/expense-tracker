"use client";

import {Button} from "@/components/button";
import {Icon} from "@/components/icon";
import {IconButton} from "@/components/icon-button";
import {
	Pagination,
	PaginationEllipsis,
	PaginationItem,
	PaginationNextTrigger,
	PaginationPrevTrigger,
} from "@/components/pagination";
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
} from "@/components/select";
import {Box, Flex, Spacer} from "@/styled-system/jsx";
import {clamp} from "@/utils/clamp";
import {PaginationSchema} from "@/utils/types";
import {Portal} from "@ark-ui/react";
import {
	CheckIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsUpDownIcon,
} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const sizes = [10, 25, 50].map((size) => ({
	value: `${size}`,
	label: `${size} rows`,
}));

interface PageControlsProps {
	__SSR_DATA: UsePageControlsProps;
}

export function PageControls(props: PageControlsProps) {
	const context = usePageControls(props.__SSR_DATA);

	return (
		<Flex gap={4} alignItems="center">
			<Box fontSize="sm">
				Showing {context.start}-{context.until} of {context.count}
			</Box>
			<Spacer />
			<Pagination
				count={context.count}
				// @ts-expect-error "Bug"
				page={context.value.page}
				pageSize={context.value.size}
				onPageChange={(o) => {
					context.setValue({
						page: o.page,
						size: o.pageSize,
					});
				}}
			>
				{({pages}) => (
					<>
						<PaginationPrevTrigger asChild>
							<IconButton variant="outline" aria-label="Next Page">
								<Icon>
									<ChevronLeftIcon />
								</Icon>
							</IconButton>
						</PaginationPrevTrigger>

						{pages.map((page, index) => {
							return page.type === "page" ? (
								<PaginationItem key={index} asChild {...page}>
									<Button variant="outline">{page.value}</Button>
								</PaginationItem>
							) : (
								<PaginationEllipsis key={index} index={index}>
									...
								</PaginationEllipsis>
							);
						})}

						<PaginationNextTrigger asChild>
							<IconButton variant="outline" aria-label="Next Page">
								<Icon>
									<ChevronRightIcon />
								</Icon>
							</IconButton>
						</PaginationNextTrigger>
					</>
				)}
			</Pagination>

			<Select
				w={28}
				items={sizes}
				value={[context.value.size.toString()]}
				onValueChange={({value}) => {
					context.setValue({
						page: 1,
						size: value[0],
					});
				}}
			>
				<SelectControl>
					<SelectTrigger>
						<SelectValueText />
						<Icon>
							<ChevronsUpDownIcon />
						</Icon>
					</SelectTrigger>
				</SelectControl>

				<Portal>
					<SelectPositioner>
						<SelectContent>
							<SelectItemGroup id="expenses-pagination-page-size">
								{sizes.map((product) => (
									<SelectItem key={product.value} item={product}>
										<SelectItemText>{product.label}</SelectItemText>
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
		</Flex>
	);
}

interface UsePageControlsProps {
	count: number;
}

function usePageControls({count}: UsePageControlsProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const value = PaginationSchema.parse({
		page: searchParams.get("page") ?? 1,
		size: searchParams.get("size") ?? 10,
	});

	const setValue = (value: {page: string | number; size: string | number}) => {
		const s = new URLSearchParams(searchParams);

		s.delete("page");
		s.delete("size");

		s.set("page", `${value.page}`);
		s.set("size", `${value.size}`);

		router.push(`${pathname}?${s.toString()}`);
	};

	const start = clamp(1 + (value.page - 1) * value.size, 0, count);
	const until = clamp(value.page * value.size, value.size, count);

	return {
		value,
		setValue,
		count,
		start,
		until,
	};
}
