import {useRouter} from "next/navigation";
import {useEffect} from "react";

export function useConditionalRedirect(when: boolean, path: string) {
	const router = useRouter();

	useEffect(() => {
		if (when) router.push(path);
	}, [when, path, router]);
}
