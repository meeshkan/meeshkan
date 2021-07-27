import { useState, useContext, ChangeEvent } from 'react';
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
import OnboardingFormWrapper from '../molecules/onboarding-form-wrapper';
import { UserContext, updateProfile } from '../../utils/user';
import { UploadedFile } from '@frontend/meeshkan-types';

type ProfileFormInputs = {
	name: string;
	jobTitle: string;
};

const jobTitles = ['Product manager', 'CTO', 'Other'];

type UpdateProfileFormProps = {
	formId?: string;

	//////////////////////
	step: number;
	setStep: React.Dispatch<React.SetStateAction<number>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	//projectName: string | null;
	//setProjectName: React.Dispatch<React.SetStateAction<string | null>>;
	//projectID: string | null;
	//setProjectID: React.Dispatch<React.SetStateAction<string | null>>;
	//clientSecret: string | null;
	//setClientSecret: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateProfileForm = ({
	setLoading,
	setStep,
	loading,
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
			// @ts-ignore
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
		<form onSubmit={handleSubmit(onSubmit)} id={formId}>
			<OnboardingFormWrapper step={step} setStep={setStep} loading={loading}>
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
			</OnboardingFormWrapper>
		</form>
	);
};

export default UpdateProfileForm;
