import React, { useContext, useState } from 'react';
import {
	InputGroup,
	Input,
	InputRightElement,
	IconButton,
	Button,
	Flex,
	useColorModeValue,
	ButtonGroup,
} from '@chakra-ui/react';
import { CopyIcon } from '@frontend/chakra-theme';
import { UserContext } from '../../utils/user';
import { useClipboard } from '../../hooks/use-clipboard';
import { eightBaseClient } from '../../utils/graphql';
import { REFRESH_INVITE_LINK } from '../../graphql/project';
import { useToaster } from '../../hooks/use-toaster';

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
			<Input
				id="invite-link-input"
				value={inviteLink}
				color="blue.400"
				onClick={onCopy}
				isReadOnly
				borderRightRadius="0"
			/>
			<IconButton
				id="copy-invite-link"
				icon={<CopyIcon />}
				aria-label="Copy invite link"
				onClick={onCopy}
				borderLeftRadius="0"
				colorScheme='gray'
				variant="outline"
				borderColor={refreshButtonBorderColor} size="md"
			/>

			<Button
				onClick={refreshInviteLink}
				isLoading={loading}
				loadingText="Refreshing"
				colorScheme='gray'
				variant="outline"
				borderColor={refreshButtonBorderColor} ml={4} size="md"
			>
				Refresh link
			</Button>
		</Flex>
	);
};

export default InviteLinkInput;
