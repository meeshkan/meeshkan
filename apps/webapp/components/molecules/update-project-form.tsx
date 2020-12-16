import { useState, useContext } from 'react';
import {
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
import { UserContext, AvatarFile } from '../../utils/user';
import { updateProject } from '../../utils/project';

type ProjectFormInputs = {
	name: string;
};

type UpdateProjectFormProps = {
	setLoading: (value: boolean) => void;
};

const UpdateProjectForm = ({ setLoading }: UpdateProjectFormProps) => {
	const [error, setError] = useState('');
	const { project, idToken } = useContext(UserContext);
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

		setLoading(false);
	};

	const handleChange = (event) => {
		setName(event.target.value);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} id="projectUpdateForm">
			<AvatarField
				isProfileAvatar={false}
				onUpload={setAvatarFile}
				existingImageUrl={project?.avatar?.downloadUrl}
			/>
			<FormControl id="name" isRequired isInvalid={!!error} mb={8}>
				<FormLabel>Project name</FormLabel>
				<Input name="name" value={name} onChange={handleChange} type="text" ref={register} />
				<FormErrorMessage>Error: {error}</FormErrorMessage>
			</FormControl>
		</form>
	);
};

export default UpdateProjectForm;
