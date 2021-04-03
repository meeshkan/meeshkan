import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Tooltip,
	useColorModeValue,
	Code,
	Flex,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import _ from 'lodash';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import AvatarField from '@molecules/avatar-field';
import { UserContext } from '@utils/user';
import { UploadedFile } from '@frontend/meeshkan-types';
import { updateProject } from '@utils/project';
import { createSlug } from '@utils/createSlug';

type ProjectFormInputs = {
	name: string;
	productionURL?: string;
	stagingURL?: string;
};

type UpdateProjectFormProps = {
	setLoading: (value: boolean) => void;
};

const UpdateProjectForm = ({ setLoading }: UpdateProjectFormProps) => {
	const [error, setError] = useState('');
	const user = useContext(UserContext);
	const { projects, project, idToken, mutate: mutateUser } = user;
	const [name, setName] = useState(project.name);
	const { configuration } = project;
	const [productionURL, setProductionURL] = useState(
		configuration.productionURL
	);
	const [stagingURL, setStagingURL] = useState(configuration.stagingURL);
	const [avatarFile, setAvatarFile] = useState<UploadedFile | null>(null);
	const { register, handleSubmit } = useForm<ProjectFormInputs>();
	const infoIconColor = useColorModeValue('gray.400', 'gray.500');

	useEffect(() => {
		setName(project.name);
		setProductionURL(configuration.productionURL);
		setStagingURL(configuration.stagingURL);
	}, [project, configuration.productionURL, configuration.stagingURL]);

	const onSubmit = async (formData: ProjectFormInputs): Promise<void> => {
		setLoading(true);
		setError('');
		const data = await updateProject(idToken, {
			...formData,
			id: project.id,
			avatar: avatarFile,
		});

		if (data.error) {
			setError(data.error.message);
			setLoading(false);
			return;
		}

		const selectedProjectIndex = _.findIndex(
			projects,
			(currentProject) => currentProject.id === project.id
		);

		projects[selectedProjectIndex].name = formData.name;
		projects[selectedProjectIndex].avatar = data.projectUpdate.avatar;
		projects[selectedProjectIndex].configuration =
			data.projectUpdate.configuration;

		await mutateUser({ ...user, projects }, false);
		Router.push(`/${createSlug(formData.name)}/settings`);
		setLoading(false);
	};

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleProductionURLChange = (event: ChangeEvent<HTMLInputElement>) => {
		setProductionURL(event.target.value);
	};

	const handleStagingURLChange = (event: ChangeEvent<HTMLInputElement>) => {
		setStagingURL(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} id="projectUpdateForm">
			<AvatarField
				onUpload={setAvatarFile}
				existingImageUrl={project?.avatar?.downloadUrl}
			/>
			<Flex mb={8} align="baseline">
				<FormLabel lineHeight="tall">Project ID:</FormLabel>{' '}
				<Code p={2} borderRadius="md" fontWeight="700">
					{project.id}
				</Code>
			</Flex>
			<FormControl id="name" isRequired isInvalid={!!error} mb={8}>
				<FormLabel>Project name</FormLabel>
				<Input
					name="name"
					value={name}
					onChange={handleNameChange}
					type="text"
					ref={register}
				/>
			</FormControl>
			<FormControl id="productionURL" isInvalid={!!error} mb={8}>
				<FormLabel>Production URL</FormLabel>
				<Input
					name="productionURL"
					value={productionURL}
					onChange={handleProductionURLChange}
					type="url"
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
						<InfoOutlineIcon ml={2} lineHeight="short" color={infoIconColor} />
					</Tooltip>
				</FormLabel>
				<Input
					name="stagingURL"
					value={stagingURL}
					onChange={handleStagingURLChange}
					type="url"
					pattern="^http(s)?:\/\/.+$"
					ref={register}
				/>
				<FormErrorMessage>Error: {error}</FormErrorMessage>
			</FormControl>
		</form>
	);
};

export default UpdateProjectForm;
