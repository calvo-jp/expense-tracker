import {Spinner} from "@/app/spinner";
import {Center} from "@/styled-system/jsx";

export default function Loading() {
	return (
		<Center>
			<Spinner w={8} h={8} />
		</Center>
	);
}
