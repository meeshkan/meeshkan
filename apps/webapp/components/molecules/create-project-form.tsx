import React, { useState, useContext } from 'react';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Tooltip,
	useColorModeValue,
	Box,
	Divider,
	Button,
	Center,
	Flex,
	Text,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import AvatarField from './avatar-field';
import { UserContext } from '../../utils/user';
import { createProject } from '../../utils/project';
import { UploadedFile } from '@frontend/meeshkan-types';
import { createSlug } from '../../utils/createSlug';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';

type ProjectFormInputs = {
	name: string;
	productionURL?: string;
	stagingURL?: string;
};

type CreateProjectFormProps = {
	setLoading: (value: boolean) => void;
	setProjectName: (value: string) => void;
	setProjectID: (value: string) => void;
	setClientSecret: (value: string) => void;
	setStep?: (step: number) => void;
	step?: number;
};

const CreateProjectForm = ({
	setLoading,
	setProjectName,
	setProjectID,
	setClientSecret,
	setStep,
	step,
}: CreateProjectFormProps) => {
	const user = useContext(UserContext);
	const { idToken, mutate: mutateUser, projects } = user;
	const { register, handleSubmit } = useForm<ProjectFormInputs>();
	const [avatarFile, setAvatarFile] = useState<UploadedFile | null>(null);
	const [error, setError] = useState('');
	const mixpanel = useAnalytics();
	const tooltipIconColor = useColorModeValue('gray.400', 'gray.500');

	const onSubmit = async (formData: ProjectFormInputs): Promise<void> => {
		setLoading(true);
		setError('');
		const data = await createProject(idToken, {
			...formData,
			...avatarFile,
		});

		if (data.error) {
			setError(data.error);
			setLoading(false);
			return;
		}

		await setProjectID(data?.userUpdate?.projects?.items[0]?.id);
		await setClientSecret(
			data?.userUpdate?.projects?.items[0]?.configuration?.clientSecret
		);

		if (setStep) {
			setStep(step + 1);
		}

		const [newProject] = data.userUpdate.projects.items;
		projects.push(newProject);
		mixpanel.track('Create new project', { projectName: newProject.name });
		// Removed because this causes a user to get kicked out of the onboarding process
		// await mutateUser({ ...user, projects });
		setLoading(false);

		setProjectName(createSlug(formData.name));
	};

	return (
		<>
			<Box as="form" onSubmit={handleSubmit(onSubmit)} id="form" w="full">
				<AvatarField location="a project" onUpload={setAvatarFile} />
				<FormControl id="name" isRequired isInvalid={!!error} mb={8}>
					<FormLabel>Name your project</FormLabel>
					<Input
						name="name"
						type="text"
						placeholder="Acme Industries"
						ref={register}
					/>
				</FormControl>
				<FormControl id="productionURL" isInvalid={!!error} mb={8}>
					<FormLabel>Production URL</FormLabel>
					<Input
						name="productionURL"
						type="url"
						placeholder="https://acme-industries.com"
						pattern="^http(s)?:\/\/.+$"
						ref={register}
					/>
				</FormControl>
				<FormControl id="stagingURL" isInvalid={!!error} mb={8}>
					<FormLabel d="flex" alignItems="center">
						Staging URL
						<Tooltip
							label="This is the URL that Meeshkan will run tests against. The default test-run interval is daily."
							placement="right-start"
						>
							<InfoOutlineIcon
								ml={2}
								lineHeight="short"
								color={tooltipIconColor}
							/>
						</Tooltip>
					</FormLabel>
					<Input
						name="stagingURL"
						type="url"
						placeholder="https://staging.acme-industries.com"
						pattern="^http(s)?:\/\/.+$"
						ref={register}
					/>
					<FormErrorMessage>Error: {error}</FormErrorMessage>
				</FormControl>
			</Box>
			<Flex w="full" align="center" mb={4}>
				<Divider my={4} />
				<Text fontFamily="mono" lineHeight="base" mx={4}>
					OR
				</Text>
				<Divider my={4} />
			</Flex>

			<Center>
				<Button>Generate a demo</Button>
			</Center>
		</>
	);
};

export default CreateProjectForm;
