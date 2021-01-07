import { useContext, useEffect } from 'react';
import {
	Box,
	IconButton,
	Alert,
	AlertTitle,
	AlertDescription,
	Code,
	CloseButton,
	useClipboard,
	useToast,
	useColorModeValue,
	Flex,
	Text,
} from '@chakra-ui/react';
import { CopyIcon } from '@frontend/chakra-theme';
import { UserContext } from '../../utils/user';

type ScriptCardProps = {
	handleClose: () => void;
};

const ScriptCard = ({ handleClose }: ScriptCardProps) => {
	const toast = useToast();
	const { project } = useContext(UserContext);
	const hasSelectedProject = project;

	let scriptTag = '';
	if (hasSelectedProject) {
		scriptTag = `<script async src="https://recorder.meeshkan.com/record.js?clientId=${project.id}"></script>`;
	}

	const { hasCopied, onCopy } = useClipboard(scriptTag);

	useEffect(() => {
		if (hasCopied) {
			toast({
				position: 'bottom-right',
				render: () => (
					<Box
						color="white"
						p={4}
						bg="blue.500"
						borderRadius="md"
						fontSize="md"
					>
						The script tag was copied to your clipboard!
					</Box>
				),
				duration: 2000,
				isClosable: true,
			});
		}
	}, [hasCopied, toast]);

	if (!hasSelectedProject) {
		return null;
	}

	return (
		<Alert
			rounded="lg"
			bg={useColorModeValue('white', 'gray.900')}
			py={5}
			p={4}
		>
			<Box flex="1" my={2} overflow="auto">
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
					<Flex
						as={Code}
						onClick={onCopy}
						fontWeight={700}
						pl={3}
						pr={0}
						backgroundColor={useColorModeValue('gray.100', 'gray.800')}
						borderRadius="md"
						w="full"
						justifyContent="space-between"
						alignItems="center"
					>
						<Text
							d="inline"
							fontFamily="mono"
							fontStyle="normal"
							fontSize="sm"
							overflow="hidden"
						>
							{scriptTag}
						</Text>
						<IconButton
							ml={4}
							size="sm"
							colorScheme="gray"
							variant="outline"
							aria-label="Copy Script Tag"
							icon={<CopyIcon />}
							onClick={onCopy}
						/>
					</Flex>
				</AlertDescription>
			</Box>
		</Alert>
	);
};

export default ScriptCard;
