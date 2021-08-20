import { useContext } from 'react';
import {
	Box,
	Alert,
	AlertTitle,
	AlertDescription,
	Code,
	CloseButton,
	useColorModeValue,
	Flex,
} from '@chakra-ui/react';
import ScriptTagInput from './script-tag-input';
import { UserContext } from '../../utils/user';

type ScriptCardProps = {
	handleClose: () => void;
};

const ScriptCard = ({ handleClose }: ScriptCardProps) => {
	const { project } = useContext(UserContext);

	const alertBackgroundColor = useColorModeValue('white', 'gray.900');
	const textColor = useColorModeValue('gray.700', 'gray.100');

	if (!project) {
		return null;
	}

	return (
		<Alert rounded="lg" bg={alertBackgroundColor} border="none" py={5} p={4}>
			<Box flex="1" overflow="auto">
				<Flex justify="space-between">
					<AlertTitle mb={2} fontStyle="normal" color={textColor}>
						Install this script in the{' '}
						<Code fontSize="inherit" lineHeight="1">
							head
						</Code>{' '}
						of your application:
					</AlertTitle>
					<CloseButton size="sm" onClick={handleClose} />
				</Flex>
				<AlertDescription color={textColor}>
					<ScriptTagInput />
				</AlertDescription>
			</Box>
		</Alert>
	);
};

export default ScriptCard;
