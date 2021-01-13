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

	if (!project) {
		return null;
	}

	return (
		<Alert
			rounded="lg"
			bg={useColorModeValue('white', 'gray.900')}
			py={5}
			p={4}
		>
			<Box flex="1" overflow="auto">
				<Flex justify="space-between">
					<AlertTitle mb={2} fontStyle="normal">
						Install this script in the{' '}
						<Code fontSize="inherit" lineHeight="1">
							head
						</Code>{' '}
						of your application:
					</AlertTitle>
					<CloseButton
						size="sm"
						onClick={handleClose}
					/>
				</Flex>
				<AlertDescription>
					<ScriptTagInput />
				</AlertDescription>
			</Box>
		</Alert>
	);
};

export default ScriptCard;
