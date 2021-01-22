import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Flex,
	Tooltip,
	useColorModeValue,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import AvatarField from './avatar-field';
import { UserContext } from '../../utils/user';
import { createProject } from '../../utils/project';
import { UploadedFile } from '../../utils/file';
import { createSlug } from '../../utils/createSlug';

type ProjectFormInputs = {
	name: string;
	productionURL?: string;
	stagingURL?: string;
};

type CreateProjectFormProps = {
	setLoading: (value: boolean) => void;
};

const CreateProjectForm = ({ setLoading }: CreateProjectFormProps) => {
	const router = useRouter();
	const user = useContext(UserContext);
	const { idToken, mutate: mutateUser, projects } = user;
	const { register, handleSubmit } = useForm<ProjectFormInputs>();
	const [avatarFile, setAvatarFile] = useState<UploadedFile | null>(null);
	const [error, setError] = useState('');

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

		const [newProject] = data.userUpdate.projects.items;
		projects.push(newProject);
		await mutateUser({ ...user, projects });
		setLoading(false);

		router.push(`/${createSlug(formData.name)}`);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} id="form">
			<AvatarField onUpload={setAvatarFile} />
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
						p={2}
						placement="right-start"
						borderRadius="md"
					>
						<InfoOutlineIcon
							ml={2}
							lineHeight="short"
							color={useColorModeValue('gray.400', 'gray.500')}
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
		</form>
	);
};

export default CreateProjectForm;
