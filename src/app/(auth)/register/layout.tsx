import {Metadata} from "next";
import {PropsWithChildren} from "react";

export const metadata: Metadata = {
	title: "Register",
};

export default function Layout(props: PropsWithChildren) {
	return props.children;
}
