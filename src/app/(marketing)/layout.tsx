import {styled} from "@/styled-system/jsx";
import {PropsWithChildren} from "react";
import {Footer} from "./footer";
import {Navbar} from "./navbar";

export default function Layout(props: PropsWithChildren) {
	return (
		<>
			<Navbar />
			<styled.main>{props.children}</styled.main>
			<Footer />
		</>
	);
}
