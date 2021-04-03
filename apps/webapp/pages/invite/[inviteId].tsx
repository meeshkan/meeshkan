import { useContext } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { LogoIcon } from '@frontend/chakra-theme';
import LoadingScreen from '@organisms/loading-screen';
import { useInviteLink } from '../../hooks/use-invite-link';
import { UserContext } from '@utils/user';
import { Project } from '@frontend/meeshkan-types';

type InviteProps = {
	cookies: string | undefined;
};

const Invite = (props: InviteProps) => {
	const router = useRouter();
	const { inviteId } = router.query;
	const { data, error } = useInviteLink(inviteId as string);
	const user = useContext(UserContext);

	const redirect = async () => {
		if (user) {
			const { projects, mutate: mutateUser } = user;
			const joinedProject = data?.project as Project;
			const projectIndex = _.findIndex(
				projects,
				(project) => project.id === joinedProject?.id
			);

			if (projectIndex !== -1) {
				projects[projectIndex] = joinedProject;
			} else {
				projects.push(joinedProject);
			}

			await mutateUser({ ...user, projects }, false);
		}

		router.push(data.redirectTo);
	};

	if (inviteId === 'invalid' || data?.invalidInvite || error) {
		return (
			<Flex align="center" justify="center" direction="column" w="100%">
				<LogoIcon width="auto" height={10} />
				<Heading fontSize="2xl" fontStyle="italic" mt={5}>
					This invite link seems to be invalid.
				</Heading>
			</Flex>
		);
	}

	if (data?.redirectTo) {
		redirect();
	}

	return <LoadingScreen />;
};

export default Invite;

export { getServerSideProps } from '@molecules/chakra';
