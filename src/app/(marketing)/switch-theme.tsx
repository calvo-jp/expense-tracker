"use client";

import {Icon} from "@/components/icon";
import {IconButton} from "@/components/icon-button";
import {MoonIcon, SunIcon} from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export function SwitchTheme() {
	const theme = useTheme();
	const mounted = useMounted();

	if (!mounted) {
		return (
			<IconButton variant="ghost" disabled>
				<Icon>
					<MoonIcon />
				</Icon>
			</IconButton>
		);
	}

	return (
		<IconButton
			variant="ghost"
			onClick={() => {
				switch (theme.theme) {
					case "dark":
						theme.setTheme("light");
						break;
					default:
						theme.setTheme("dark");
						break;
				}
			}}
		>
			<Icon>{theme.theme === "light" ? <SunIcon /> : <MoonIcon />}</Icon>
		</IconButton>
	);
}

function useMounted() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return mounted;
}
