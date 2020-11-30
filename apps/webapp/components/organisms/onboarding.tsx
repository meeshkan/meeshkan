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
} from '@chakra-ui/react';
import { FilePlusIcon } from '@frontend/chakra-theme';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../utils/user';
import { createProject } from '../../utils/project';

type FormInputs = {
	name: string;
	avatarUrl?: string;
};

const Onboarding = () => {
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
			justify="space-between"
			direction="column"
			h="100%"
			w="100%"
			p={8}
		>
			<Box>
				<Heading as="h1" fontSize="3xl" mb={8} textAlign="center">
					Onboarding — Create your first project
				</Heading>
				<form onSubmit={handleSubmit(onSubmit)} id="onboardingForm">
					<FormControl id="avatar" isInvalid={!!error} mb={6}>
						<Flex justify="space-between">
							<Box>
								<FormLabel>Upload an avatar</FormLabel>
								<Text mt={3} color="gray.500">
									We suggest an image that is 200px by 200px or bigger.
								</Text>
							</Box>
							<Flex
								align="center"
								justify="center"
								borderWidth="1px"
								borderRadius="md"
								borderColor="gray.500"
								borderStyle="dashed"
								p={[4, 5, 6, 8]}
								ml={4}
							>
								<FilePlusIcon w={8} h={8} />
							</Flex>
						</Flex>
						<FormErrorMessage>{error}</FormErrorMessage>
					</FormControl>
					<FormControl id="name" isRequired isInvalid={!!error}>
						<FormLabel>Name your project</FormLabel>
						<Input
							name="name"
							type="text"
							placeholder="Acme Industries"
							ref={register}
						/>
					</FormControl>
				</form>
			</Box>
			<Button mt={4} type="submit" isLoading={loading} form="onboardingForm">
				Create project
			</Button>
		</Flex>
	);
};

export default Onboarding;
