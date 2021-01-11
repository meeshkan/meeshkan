import { useContext } from 'react';
import {
	InputGroup,
	Input,
	InputRightElement,
	IconButton,
} from '@chakra-ui/react';
import { CopyIcon } from '@frontend/chakra-theme';
import { UserContext } from '../../utils/user';
import { useClipboard } from '../../hooks/use-clipboard';

const InviteLinkInput = () => {
	const { project } = useContext(UserContext);
	const { onCopy } = useClipboard(
		project?.configuration?.inviteLink,
		'The project\'s invite link was copied to your clipboard!'
	);

	return (
		<InputGroup mb={4}>
			<Input
				value={project.configuration.inviteLink}
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
	);
};

export default InviteLinkInput;
