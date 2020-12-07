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
import {
	UserContext,
	updateProfile,
	updateAvatar as updateUserAvatar,
	AvatarFile,
} from '../../utils/user';

type ProfileFormInputs = {
	name: string;
	jobTitle: string;
};

const jobTitles = ['Product manager', 'CTO', 'Other'];

type UpdateProfileFormProps = {
	setLoading: (value: boolean) => void;
	setStep: (step: 1 | 2) => void;
};

const UpdateProfileForm = ({ setLoading, setStep }: UpdateProfileFormProps) => {
	const [error, setError] = useState('');
	const [title, setTitle] = useState(jobTitles[0]);
	const { name, idToken } = useContext(UserContext);
	const { register, handleSubmit } = useForm<ProfileFormInputs>();

	const onSubmit = async (formData: ProfileFormInputs): Promise<void> => {
		setLoading(true);
		setError('');
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

	const onUpload = (data: AvatarFile) => updateUserAvatar(idToken, data);

	return (
		<form onSubmit={handleSubmit(onSubmit)} id="form">
			<AvatarField isProfileAvatar onUpload={onUpload} />
			<FormControl id="name" isRequired isInvalid={!!error} mb={8}>
				<FormLabel>What's your name?</FormLabel>
				<Input name="name" value={name} type="text" ref={register} />
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
	);
};

export default UpdateProfileForm;