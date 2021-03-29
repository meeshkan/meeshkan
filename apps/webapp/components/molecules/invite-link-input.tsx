import React, { useContext, useState } from 'react';
import {
	InputGroup,
	Input,
	InputRightElement,
	IconButton,
	Button,
	Flex,
	useColorModeValue,
} from '@chakra-ui/react';
import { CopyIcon } from '@frontend/chakra-theme';
import { UserContext } from '../../utils/user';
import { useClipboard } from '../../hooks/use-clipboard';
import { eightBaseClient } from '../../utils/graphql';
import { REFRESH_INVITE_LINK } from '../../graphql/project';
import { useToaster } from '../atoms/toast';

const InviteLinkInput = () => {
	const { project, idToken } = useContext(UserContext);
	const [inviteLink, setInviteLink] = useState(
		project.configuration.inviteLink
	);
	const [loading, setLoading] = useState(false);
	const refreshButtonBorderColor = useColorModeValue('gray.200', 'gray.700');
	const { onCopy } = useClipboard({
		toastTitle: "This project's invite link was copied to clipboard.",
		toastMessage: 'Share it with your team members.',
		text: project?.configuration?.inviteLink,
		status: 'info',
	});

	const toaster = useToaster();
	const client = eightBaseClient(idToken);

	const refreshInviteLink = () => {
		setLoading(true);
		client
			.request(REFRESH_INVITE_LINK, {
				projectID: project.id,
			})
			.then((res) => {
				toaster({
					title: 'Successfully refreshed invite link.',
					description:
						"Copy the invite link and send to anyone you'd like to add to your project.",
					status: 'success',
				});
				setInviteLink(res.projectUpdate.configuration.inviteLink);
				setLoading(false);
			});
	};

	return (
		<Flex>
			<InputGroup mb={4}>
				<Input
					value={inviteLink}
					color="blue.400"
					onClick={onCopy}
					isReadOnly
				/>
				<InputRightElement>
					<IconButton
						icon={<CopyIcon color="gray.500" />}
						aria-label="Copy invite link"
						onClick={onCopy}
						size="md"
						variant="ghost"
					/>
				</InputRightElement>
			</InputGroup>
			<Button
				colorScheme="gray"
				variant="subtle"
				ml={4}
				border="1px solid"
				borderColor={refreshButtonBorderColor}
				onClick={refreshInviteLink}
				isLoading={loading}
				loadingText="Refreshing"
			>
				Refresh link
			</Button>
		</Flex>
	);
};

export default InviteLinkInput;
