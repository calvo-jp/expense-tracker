import {authOptions} from '@/config/auth-options';
import {styled} from '@/styled-system/jsx';
import {getServerSession} from 'next-auth';

export default async function Index() {
	const session = await getServerSession(authOptions);

	return <styled.div>{session?.user.name}</styled.div>;
}
