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
	Menu,
	MenuButton,
	MenuList,
	MenuOptionGroup,
	MenuItemOption,
	Input,
	Button,
} from '@chakra-ui/react';
import { ArrowUpDownIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import AvatarField from '../molecules/avatar-field';
import { UserContext } from '../../utils/user';
import { createProject } from '../../utils/project';
import { updateProfile } from '../../utils/user';

type ProjectFormInputs = {
	name: string;
};

type ProfileFormInputs = {
	name: string;
	jobTitle: string;
};

const jobTitles = ['Product manager', 'CTO', 'Other'];

type StepOneProps = {
	setStep: (step: 1 | 2) => void;
};

const StepOne = ({ setStep }: StepOneProps) => {
	const [error, setError] = useState('');
	const [title, setTitle] = useState(jobTitles[0]);
	const [loading, setLoading] = useState(false);
	const { name, idToken } = useContext(UserContext);
	const { register, handleSubmit } = useForm<ProfileFormInputs>();

	const onSubmit = async (formData: ProfileFormInputs): Promise<void> => {
		setLoading(true);
		const data = await updateProfile(idToken, {
			name: formData.name,
			jobTitle: title,
		});

		if (data.error) {
			setError(data.error.message);
			setLoading(false);
			return;
		}

		setStep(2);
		setLoading(false);
	};

	return (
		<>
			<Box>
				<Heading as="h1" fontSize="3xl" mb={8} textAlign="center">
					Onboarding — Set up your profile
				</Heading>
				<form onSubmit={handleSubmit(onSubmit)} id="profileForm">
					<AvatarField />
					<FormControl id="name" isRequired isInvalid={!!error} mb={8}>
						<FormLabel>What's your name?</FormLabel>
						<Input
							name="name"
							value={name}
							type="text"
							ref={register}
						/>
					</FormControl>
					<FormControl id="title" isRequired isInvalid={!!error}>
						<FormLabel>What's your job title?</FormLabel>
						<Menu>
							<MenuButton
								as={Button}
								colorScheme="gray"
								rightIcon={<ArrowUpDownIcon />}
								w="100%"
								textAlign="left"
							>
								{title}
							</MenuButton>
							<MenuList>
								<MenuOptionGroup
									defaultValue={title}
									title="Projects"
									type="radio"
								>
									{jobTitles.map((title) => (
										<MenuItemOption
											key={title}
											value={title}
											onClick={() => setTitle(title)}
										>
											{title}
										</MenuItemOption>
									))}
								</MenuOptionGroup>
							</MenuList>
						</Menu>
						<FormErrorMessage>Error: {error}</FormErrorMessage>
					</FormControl>
				</form>
			</Box>
			<Flex justify="space-between" align="center" w="100%">
				<Box />
				<Text color="gray.500">Step 1 of 2</Text>
				<Button mt={4} type="submit" isLoading={loading} form="profileForm">
					Next step
				</Button>
			</Flex>
		</>
	);
};

type StepTwoProps = {
	setStep: (step: 1 | 2) => void;
};

const StepTwo = ({ setStep }: StepTwoProps) => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { idToken } = useContext(UserContext);
	const { register, handleSubmit } = useForm<ProjectFormInputs>();

	const onSubmit = async (formData: ProjectFormInputs): Promise<void> => {
		setLoading(true);
		const data = await createProject(idToken, {
			name: formData.name,
		});

		if (data.error) {
			setError(data.error.message);
			setLoading(false);
			return;
		}

		setLoading(false);
		router.reload();
	};

	return (
		<>
			<Box>
				<Heading as="h1" fontSize="3xl" mb={8} textAlign="center">
					Onboarding — Create your first project
				</Heading>
				<form onSubmit={handleSubmit(onSubmit)} id="projectForm">
					<FormControl id="name" isRequired isInvalid={!!error}>
						<FormLabel>Name your project</FormLabel>
						<Input
							name="name"
							type="text"
							placeholder="Acme Industries"
							ref={register}
						/>
					</FormControl>
					<FormErrorMessage>Error: {error}</FormErrorMessage>
				</form>
			</Box>
			<Flex justify="space-between" align="center" w="100%">
				<Button mt={4} colorScheme="gray" onClick={() => setStep(1)}>
					Back
				</Button>
				<Text color="gray.500">Step 2 of 2</Text>
				<Button mt={4} type="submit" isLoading={loading} form="projectForm">
					Create project
				</Button>
			</Flex>
		</>
	);
};


const Onboarding = () => {
	const [step, setStep] = useState<1 | 2>(1);
	return (
		<Flex
			align="center"
			justify="space-between"
			direction="column"
			h="100%"
			w="100%"
			p={8}
		>
			{step === 1 ? (
				<StepOne setStep={setStep} />
			) : (
				<StepTwo setStep={setStep} />
			)}
		</Flex>
	);
};

export default Onboarding;
