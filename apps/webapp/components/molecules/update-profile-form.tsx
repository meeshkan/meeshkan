import React, {
	useState,
	useContext,
	ChangeEvent,
	Dispatch,
	SetStateAction,
} from 'react';
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
	Box,
} from '@chakra-ui/react';
import { ArrowUpDownIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import AvatarField from '../molecules/avatar-field';
import { UserContext, updateProfile } from '../../utils/user';
import { UploadedFile } from '@frontend/meeshkan-types';

type ProfileFormInputs = {
	name: string;
	jobTitle: string;
};

const jobTitles = ['Product manager', 'CTO', 'Other'];

type UpdateProfileFormProps = {
	formId?: string;
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
	setLoading: Dispatch<SetStateAction<boolean>>;
};

const UpdateProfileForm = ({
	setLoading,
	setStep,
	step,
	formId = 'form',
}: UpdateProfileFormProps) => {
	const [error, setError] = useState('');
	const user = useContext(UserContext);
	const {
		name: currentName,
		jobTitle,
		avatar,
		idToken,
		mutate: mutateUser,
	} = user;
	const [name, setName] = useState<string>(currentName);
	const [title, setTitle] = useState(jobTitle || jobTitles[0]);
	const [avatarFile, setAvatarFile] = useState<UploadedFile | null>(null);
	const { register, handleSubmit } = useForm<ProfileFormInputs>();

	const onSubmit = async (formData: ProfileFormInputs): Promise<void> => {
		setLoading(true);
		setError('');
		const data = await updateProfile(idToken, {
			name: formData.name,
			jobTitle: title,
			avatar: avatarFile,
		});

		if (data.error) {
			setError(data.error.message);
			setLoading(false);
			return;
		}

		if (setStep) {
			setStep(step + 1);
		}

		const { firstName, lastName, avatar: newAvatar } = data.userUpdate;
		await mutateUser({
			...user,
			firstName,
			lastName,
			avatar: newAvatar?.downloadUrl,
		});
		setLoading(false);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	return (
		<Box as="form" onSubmit={handleSubmit(onSubmit)} id={formId}>
			<AvatarField onUpload={setAvatarFile} existingImageUrl={avatar} />
			<FormControl id="name" isRequired isInvalid={!!error} mb={8}>
				<FormLabel>What's your name?</FormLabel>
				<Input
					name="name"
					value={name}
					onChange={handleChange}
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
						<MenuOptionGroup defaultValue={title} type="radio">
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
		</Box>
	);
};

export default UpdateProfileForm;
