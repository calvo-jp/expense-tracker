import {
	Drawer,
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerPositioner,
	DrawerTrigger,
} from "@/components/drawer";
import {Icon} from "@/components/icon";
import {IconButton} from "@/components/icon-button";
import {prisma} from "@/config/prisma";
import {Box, Flex} from "@/styled-system/jsx";
import {Portal} from "@ark-ui/react";
import {formatDistanceToNow} from "date-fns";
import {BellIcon, ChevronRightIcon, Laptop2Icon} from "lucide-react";
import {ReactNode} from "react";

export async function Notifications() {
	const activities = await prisma.activity.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<IconButton variant="ghost">
					<Icon w={6} h={6}>
						<BellIcon />
					</Icon>
				</IconButton>
			</DrawerTrigger>

			<Portal>
				<DrawerBackdrop />
				<DrawerPositioner>
					<DrawerContent>
						<DrawerHeader p={0}>
							<Flex h="navbar.height" pr={4} pl={6} gap={2} alignItems="center">
								<DrawerCloseTrigger asChild>
									<IconButton variant="outline">
										<Icon>
											<ChevronRightIcon />
										</Icon>
									</IconButton>
								</DrawerCloseTrigger>
							</Flex>
						</DrawerHeader>
						<DrawerBody py={2} px={0}>
							{activities.map((activity) => {
								switch (activity.type) {
									case "Login":
										return (
											<Item
												key={activity.id}
												icon={<Laptop2Icon />}
												title="Device Login"
												description={
													<>
														{formatDistanceToNow(activity.createdAt)} at{" "}
														{activity.location || "unknown place"}
													</>
												}
											/>
										);
									default:
										return null;
								}
							})}
						</DrawerBody>
					</DrawerContent>
				</DrawerPositioner>
			</Portal>
		</Drawer>
	);
}

interface ItemProps {
	icon: JSX.Element;
	title: string;
	description: ReactNode;
}

function Item({title, description, icon}: ItemProps) {
	return (
		<Box py={2.5} px={4}>
			<Flex gap={3} alignItems="center">
				<Flex p={2.5} bg="bg.subtle" rounded="full">
					<Icon size="lg">{icon}</Icon>
				</Flex>
				<Box>
					<Box fontWeight="medium" letterSpacing="wide">
						{title}
					</Box>
					<Box fontSize="sm" color="fg.muted" lineHeight="tight">
						{description}
					</Box>
				</Box>
			</Flex>
		</Box>
	);
}
