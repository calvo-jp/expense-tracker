import {Link} from "@/components/next-js/link";
import {Flex, styled} from "@/styled-system/jsx";
import {Metadata} from "next";
import {LoginForm} from "./login-form";

export const metadata: Metadata = {
	title: "Login",
};

export default function Login() {
	return (
		<>
			<LoginForm />

			<Flex mt={5} gap={1} justifyContent="center">
				<styled.span color="fg.muted">Don&rsquo;t have an account?</styled.span>
				<Link
					href="/register"
					_hover={{
						textDecoration: "underline",
						textUnderlineOffset: "2px",
					}}
				>
					Register
				</Link>
			</Flex>
		</>
	);
}
