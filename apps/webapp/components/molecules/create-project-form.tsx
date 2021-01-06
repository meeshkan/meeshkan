import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import AvatarField from './avatar-field';
import { UserContext, AvatarFile } from '../../utils/user';
import { createProject } from '../../utils/project';
import { createSlug } from '../../utils/createSlug';

type ProjectFormInputs = {
	name: string;
};

type CreateProjectFormProps = {
	setLoading: (value: boolean) => void;
};

const CreateProjectForm = ({ setLoading }: CreateProjectFormProps) => {
	const router = useRouter();
	const user = useContext(UserContext);
	const { idToken, mutate: mutateUser, projects } = user;
	const { register, handleSubmit } = useForm<ProjectFormInputs>();
	const [avatarFile, setAvatarFile] = useState<AvatarFile>();
	const [error, setError] = useState('');

	const onSubmit = async (formData: ProjectFormInputs): Promise<void> => {
		setLoading(true);
		setError('');
		const data = await createProject(idToken, {
			name: formData.name,
			...avatarFile,
		});

		if (data.error) {
			setError(data.error.message);
			setLoading(false);
			return;
		}

		const [newProject] = data.userUpdate.projects.items;
		projects.push(newProject)
		await mutateUser({ ...user, projects });
		setLoading(false);

        if (router.pathname === '/new-project') {
            router.push(`/${createSlug(formData.name)}`);
            return;
        }

		router.reload();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} id="form">
			<AvatarField isProfileAvatar={false} onUpload={setAvatarFile} />
			<FormControl id="name" isRequired isInvalid={!!error}>
				<FormLabel>Name your project</FormLabel>
				<Input
					name="name"
					type="text"
					placeholder="Acme Industries"
					ref={register}
				/>
				<FormErrorMessage>Error: {error}</FormErrorMessage>
			</FormControl>
		</form>
	);
};

export default CreateProjectForm;
