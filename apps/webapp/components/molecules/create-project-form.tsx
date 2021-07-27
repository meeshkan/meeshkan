import { useState, useContext } from 'react';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Tooltip,
	useColorModeValue,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import AvatarField from './avatar-field';
import { UserContext } from '../../utils/user';
import { createProject } from '../../utils/project';
import { UploadedFile } from '@frontend/meeshkan-types';
import { createSlug } from '../../utils/createSlug';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';
import OnboardingFormWrapper from './onboarding-form-wrapper';
import CreateProjectWrapper from './create-project-wrapper';

type ProjectFormInputs = {
	name: string;
	productionURL?: string;
	stagingURL?: string;
};

type CreateProjectFormProps = {
	//setLoading: (value: boolean) => void;
	//setProjectName: (value: string) => void;
	//setProjectID: (value: string) => void;
	//setClientSecret: (value: string) => void;
	//setStep?: (step: 1 | 2 | 3) => void;
	//step?: 1 | 2 | 3;
	////////////////////
	isOnboarding: boolean;
	step: number;
	setStep: React.Dispatch<React.SetStateAction<number>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	//projectName: string | null;
	setProjectName: React.Dispatch<React.SetStateAction<string | null>>;
	//projectID: string | null;
	setProjectID: React.Dispatch<React.SetStateAction<string | null>>;
	//clientSecret: string | null;
	setClientSecret: React.Dispatch<React.SetStateAction<string | null>>;
};

const CreateProjectForm = ({
	setLoading,
	setProjectName,
	setProjectID,
	setClientSecret,
	setStep,
	isOnboarding,
	step,
	loading,
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

		setProjectID(data?.userUpdate?.projects?.items[0]?.id);
		setClientSecret(
			data?.userUpdate?.projects?.items[0]?.configuration?.clientSecret
		);

		if (setStep) {
			// @ts-ignore
			setStep(step + 1);
		}

		const [newProject] = data.userUpdate.projects.items;
		projects.push(newProject);
		mixpanel.track('Create new project', { projectName: newProject.name });
		await mutateUser({ ...user, projects });
		setLoading(false);

		setProjectName(createSlug(formData.name));
	};
	const Wrapper: React.FC<{}> = ({ children }) =>
		isOnboarding ? (
			<OnboardingFormWrapper step={step} setStep={setStep} loading={loading}>
				{children}
			</OnboardingFormWrapper>
		) : (
			<CreateProjectWrapper step={step} setStep={setStep} loading={loading}>
				{children}
			</CreateProjectWrapper>
		);
	return (
		<form onSubmit={handleSubmit(onSubmit)} id="form">
			<Wrapper>
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
			</Wrapper>
		</form>
	);
};

export default CreateProjectForm;
