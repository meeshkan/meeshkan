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
import { UserContext, AvatarFile } from '../../utils/user';
import { updateProject } from '../../utils/project';
import { createSlug } from '../../utils/createSlug';

type ProjectFormInputs = {
	name: string;
};

type UpdateProjectFormProps = {
	setLoading: (value: boolean) => void;
};

const UpdateProjectForm = ({ setLoading }: UpdateProjectFormProps) => {
	const [error, setError] = useState('');
	const user = useContext(UserContext);
	const { projects, project, idToken, mutate: mutateUser } = user;
	const [name, setName] = useState<string>(project.name);
	const [avatarFile, setAvatarFile] = useState<AvatarFile>();
	const { register, handleSubmit } = useForm<ProjectFormInputs>();

	const onSubmit = async (formData: ProjectFormInputs): Promise<void> => {
		setLoading(true);
		setError('');
		const data = await updateProject(idToken, {
			id: project.id,
			name: formData.name,
			...avatarFile,
		});

		if (data.error) {
			setError(data.error.message);
			setLoading(false);
			return;
		}

		const selectedProjectIndex = _.findIndex(
			projects,
			currentProject => currentProject.id === project.id
		);

		projects[selectedProjectIndex].name = formData.name;
		projects[selectedProjectIndex].avatar = data.projectUpdate.avatar.downloadUrl;

		await mutateUser({ ...user, projects }, false);
		Router.push(`/${createSlug(formData.name)}/settings`);
		setLoading(false);
	};

	const handleChange = (event) => {
		setName(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} id="projectUpdateForm">
			<AvatarField
				isProfileAvatar={false}
				onUpload={setAvatarFile}
				existingImageUrl={project?.avatar?.downloadUrl}
			/>
			<FormControl id="name" isRequired isInvalid={!!error} mb={8}>
				<FormLabel>Project name</FormLabel>
				<Input
					name="name"
					value={name}
					onChange={handleChange}
					type="text"
					ref={register}
				/>
				<FormErrorMessage>Error: {error}</FormErrorMessage>
			</FormControl>
		</form>
	);
};

export default UpdateProjectForm;
