import { useState, useContext } from 'react';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
} from '@chakra-ui/react';
import _ from 'lodash';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import AvatarField from '../molecules/avatar-field';
import { UserContext } from '../../utils/user';
import { UploadedFile } from '../../utils/file';
import { updateProject } from '../../utils/project';
import { createSlug } from '../../utils/createSlug';

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
	const [productionURL, setProductionURL] = useState(configuration.productionURL);
	const [stagingURL, setStagingURL] = useState(configuration.stagingURL);
	const [avatarFile, setAvatarFile] = useState<UploadedFile | null>(null);
	const { register, handleSubmit } = useForm<ProjectFormInputs>();

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
		projects[selectedProjectIndex].configuration = data.projectUpdate.configuration;

		await mutateUser({ ...user, projects }, false);
		Router.push(`/${createSlug(formData.name)}/settings`);
		setLoading(false);
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleProductionURLChange = (event) => {
		setProductionURL(event.target.value);
	};

	const handleStagingURLChange = (event) => {
		setStagingURL(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} id="projectUpdateForm">
			<AvatarField
				onUpload={setAvatarFile}
				existingImageUrl={project?.avatar?.downloadUrl}
			/>
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
				<FormLabel>Staging URL</FormLabel>
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
