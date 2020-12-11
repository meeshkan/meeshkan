import { Flex, Heading } from '@chakra-ui/react';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { LogoIcon } from '@frontend/chakra-theme';
import LoadingScreen from '../../components/organisms/loading-screen';
import { UserContext } from '../../utils/user';
import { useInviteLink } from '../../hooks/use-invite-link';

type InviteProps = {
	cookies: string | undefined;
};

const Invite = (props: InviteProps) => {
	const router = useRouter();
	const { inviteId } = router.query;
	const { data, loading } = useInviteLink(inviteId as string);

	if (inviteId === 'invalid' || data?.invalidInvite) {
		return (
			<Flex align="center" justify="center" direction="column" h="100vh">
				<LogoIcon width="auto" height={10} />
				<Heading fontSize="2xl" fontStyle="italic" mt={5}>
					This invite link seems to be invalid.
				</Heading>
			</Flex>
		);
	}

	if (data?.redirectTo) {
		router.push(data.redirectTo);
	}

	return <LoadingScreen />;
};

export default Invite;

export { getServerSideProps } from '../../components/molecules/chakra';
