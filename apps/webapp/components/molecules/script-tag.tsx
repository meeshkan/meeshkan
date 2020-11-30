import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { transparentize } from '@chakra-ui/theme-tools';
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
} from '@chakra-ui/react';
import { CopyIcon } from '@frontend/chakra-theme';
import { UserContext } from '../../utils/user';

const ScriptCard = () => {
	const toast = useToast();
    const router = useRouter();
	const { projects } = useContext(UserContext);
    const hasProjects = projects.length > 0;

    let scriptTag = '';
    if (hasProjects) {
        scriptTag = `<script async src="https://recorder.meeshkan.com/record.js?clientId=${projects[0].id}"></script>`;
    }

    const { hasCopied, onCopy } = useClipboard(scriptTag);

	const handleClose = () => {
		router.push({
			pathname: '/',
			query: {},
		});
	};

	useEffect(() => {
		if (hasCopied) {
			toast({
				position: 'bottom-right',
				render: () => (
					<Box
						color="white"
						p={4}
						// @ts-expect-error
						bg={transparentize('cyan.500', 0.2)}
						borderRadius="lg"
					>
						The script tag was copied to your clipboard!
					</Box>
				),
				duration: 2000,
				isClosable: true,
			});
		}
	}, [hasCopied, toast]);

    if (!hasProjects) {
        return null;
    }

    return (
        // @ts-expect-error
        <Alert rounded="lg" bg={transparentize('cyan.500', 0.2)} py={5} overflowX="scroll">
            <Box flex="1" my={2}>
                <AlertTitle>
                    Install this script in the head of your application:
                </AlertTitle>
                <AlertDescription d="flex" alignItems="center">
                    <Code
                        bg="cyan.100"
                        onClick={onCopy}
                        color="cyan.900"
                        borderRadius="lg"
                        p={2}
                    >
                        {scriptTag}
                    </Code>
                    <IconButton
                        ml={2}
                        size="sm"
                        colorScheme="cyan"
                        variant="outline"
                        aria-label="Copy Script Tag"
                        icon={<CopyIcon />}
                        onClick={onCopy}
                    />
                </AlertDescription>
            </Box>
            <CloseButton
                position="absolute"
                colorScheme="cyan"
                size="sm"
                right="8px"
                top="8px"
                onClick={handleClose}
            />
        </Alert>
    );
};

export default ScriptCard;
