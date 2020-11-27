import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
	Heading,
	Text,
	Box,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Button,
	useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../utils/user';
import { createProject } from '../../utils/project';

type FormInputs = {
	name: string;
	avatarUrl?: string;
};

const OnboardingScreen = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { idToken } = useContext(UserContext);
	const { register, handleSubmit } = useForm<FormInputs>();

	const onSubmit = async (formData: FormInputs): Promise<void> => {
		setLoading(true);
		const data = await createProject(idToken, {
			name: formData.name,
		});

		if (data.error) {
			setError(data.error.message);
			return;
		}

		setLoading(false);
		router.reload();
		window.location.href = `${window.location.pathname}?onboarding=true`;
	};

	return (
		<Flex
			align="center"
			justify="center"
			direction="column"
			h="100vh"
			bg={useColorModeValue('gray.100', 'gray.800')}
		>
			<Box
				maxW="500px"
				p={8}
				bg={useColorModeValue('white', 'gray.900')}
				rounded="lg"
			>
				<Box textAlign="center">
					<Heading as="h1" fontSize="3xl" mb={3}>
						Welcome to Meeshkan!
					</Heading>
					<Text mb={5}>Let's start off by creating a new project.</Text>
				</Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl id="name" isRequired isInvalid={!!error} mb={4}>
						<FormLabel>Project Name</FormLabel>
						<Input
							name="name"
							type="text"
							placeholder="Acme Industries"
							ref={register}
						/>
					</FormControl>
					<FormControl id="avatar" isInvalid={!!error}>
						<FormLabel>Avatar URL</FormLabel>
						<Input
							name="avatar"
							type="text"
							placeholder="https://meeshkan.com/icons/icon.png"
							ref={register}
						/>
						<FormErrorMessage>{error}</FormErrorMessage>
					</FormControl>
					<Button mt={4} colorScheme="red" type="submit" isLoading={loading}>
						Create
					</Button>
				</form>
			</Box>
		</Flex>
	);
};

export default OnboardingScreen;
