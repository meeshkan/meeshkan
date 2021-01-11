import { useContext } from 'react';
import {
	InputGroup,
	Input,
	InputRightElement,
	IconButton,
	useColorModeValue,
} from '@chakra-ui/react';
import { CopyIcon } from '@frontend/chakra-theme';
import { UserContext } from '../../utils/user';
import { useClipboard } from '../../hooks/use-clipboard';

const ScriptTagInput = () => {
	const { project } = useContext(UserContext);

	let scriptTag = '';
	if (project) {
		scriptTag = `<script async src="https://recorder.meeshkan.com/record.js?clientId=${project.id}"></script>`;
	}

	const { onCopy } = useClipboard(
		scriptTag,
		'The project\'s script tag was copied to your clipboard!'
	);

	return (
		<InputGroup>
			<Input
				value={scriptTag}
				bg={useColorModeValue('gray.100', 'gray.800')}
				fontFamily="mono"
				fontStyle="normal"
				fontSize="sm"
				fontWeight={700}
				overflow="hidden"
				onClick={onCopy}
				isReadOnly
			/>
			<InputRightElement>
				<IconButton
					icon={<CopyIcon color="gray.500" />}
					aria-label="Copy script tag"
					onClick={onCopy}
					size="md"
					variant="ghost"
				/>
			</InputRightElement>
		</InputGroup>
	);
};

export default ScriptTagInput;
