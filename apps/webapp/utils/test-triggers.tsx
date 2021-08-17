import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
	Button,
	Checkbox,
	Divider,
	FormControl,
	FormLabel,
	Heading,
	Input,
	LightMode,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Tooltip,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { mutate } from 'swr';
import { TOGGLE_TEST_RUNS, UPDATE_STAGING_URL } from '../graphql/project';
import { eightBaseClient } from './graphql';
import { UserContext } from './user';
import { useToaster } from '../hooks/use-toaster';
import { useForm } from 'react-hook-form';
import { PlayIcon } from '@frontend/chakra-theme';

type TriggerTestRunProps = {
	/** Defaults to 'Trigger all tests' if not defined. */
	buttonText?: string;
	/** Defaults to running all tests if not defined. */
	singleOrAll?: 'single' | 'all';
	/** If triggering a single test, which user story? */
	userStoryId?: string;
	/** Are we on a demo plan? */
	onDemoPlan: boolean;
};

export const TriggerTestRun = ({
	buttonText = 'Trigger all tests',
	singleOrAll = 'all',
	userStoryId,
	onDemoPlan,
}: TriggerTestRunProps) => {
	const { idToken, setProject, project } = useContext(UserContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toaster = useToaster();
	const { register, handleSubmit } = useForm();
	const [testTriggering, setTestTriggering] = useState(false);
	const client = eightBaseClient(idToken);

	const activateTestRuns = async () => {
		const response = await client.request(TOGGLE_TEST_RUNS, {
			projectId: project?.id,
			toggle: true,
		});

		const updatedTestRunnerToggle =
			response.projectUpdate.configuration.activeTestRuns;
		setProject({
			...project,
			configuration: {
				...project.configuration,
				activeTestRuns: updatedTestRunnerToggle,
			},
		});
	};

	const triggerTestRun = async (stagingURL: string) => {
		try {
			if (project && !project.configuration.activeTestRuns) {
				await activateTestRuns();
			}

			const response = await fetch(
				process.env.NEXT_PUBLIC_TEST_TRIGGER_ENDPOINT ||
					'https://api.meeshkan.io/test-runner-staging/test-trigger',
				{
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						clientId: project?.id,
						url: stagingURL,
						clientSecret: project?.configuration?.clientSecret,
					}),
				}
			);

			await toaster({
				title: 'Test run triggered',
				description: 'The run should show up shortly.',
				status: 'success',
			});
		} catch (error) {
			console.error(error.message);
			toaster({
				title: 'Test run failed to trigger',
				description: 'Try again shortly.',
				status: 'error',
			});
		}
	};

	const triggerSingleTestRun = async (
		stagingURL: string,
		userStoryId: string
	) => {
		try {
			if (project && !project.configuration.activeTestRuns) {
				await activateTestRuns();
			}

			const response = await fetch(
				process.env.NEXT_PUBLIC_TEST_TRIGGER_ENDPOINT ||
					'https://api.meeshkan.io/test-runner-staging/test-trigger',
				{
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						clientId: project?.id,
						url: stagingURL,
						limitToUserStory: userStoryId,
						clientSecret: project?.configuration?.clientSecret,
					}),
				}
			);

			await toaster({
				title: 'Test run triggered',
				description: 'The run should show up shortly.',
				status: 'success',
			});
		} catch (error) {
			console.error(error.message);
			toaster({
				title: 'Test run failed to trigger',
				description: 'Try again shortly.',
				status: 'error',
			});
		}
	};

	const handleTriggerTestRun = async () => {
		setTestTriggering(true);
		if (!project?.configuration?.stagingURL) {
			onOpen();
		}
		if (singleOrAll === 'all') {
			await triggerTestRun(project?.configuration?.stagingURL);
			setTestTriggering(false);
		} else if (singleOrAll === 'single') {
			await triggerSingleTestRun(
				project?.configuration?.stagingURL,
				userStoryId
			);
			setTestTriggering(false);
		}
	};

	type StagingURLInputs = {
		stagingURL: string;
		saveToProject: boolean;
	};

	const handleStagingURLForm = async (
		formData: StagingURLInputs
	): Promise<void> => {
		setTestTriggering(true);
		if (formData.saveToProject) {
			await client.request(UPDATE_STAGING_URL, {
				projectID: project?.id,
				stagingURL: formData.stagingURL,
			});
			await mutate('/api/session');
		}
		triggerTestRun(formData.stagingURL);
		onClose();
		setTestTriggering(false);
	};

	const tooltipIconColor = useColorModeValue('gray.400', 'gray.500');
	const modalHeaderColor = useColorModeValue('gray.900', 'white');
	const modalBackground = useColorModeValue('white', 'gray.800');
	const button = (
		<Button
			leftIcon={<PlayIcon />}
			onClick={onDemoPlan ? () => {} : handleTriggerTestRun}
			id="trigger-test-run"
			isActive={!onDemoPlan}
			isDisabled={onDemoPlan}
			isLoading={testTriggering}
			loadingText="Starting test run"
			size="sm"
		>
			{buttonText}
		</Button>
	);

	return (
		<>
			(onDemoPlan ?
			<Tooltip hasArrow label="Test runs cannot be triggered on a demo plan" bg="gray.300" color="black">
				{button}
			</Tooltip>
			: {button})
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				motionPreset="scale"
				size="xl"
				scrollBehavior="inside"
			>
				<ModalOverlay />
				<ModalContent
					backgroundColor={modalBackground}
					borderRadius="lg"
					as="form"
					onSubmit={handleSubmit(handleStagingURLForm)}
				>
					<ModalHeader px={6} pt={4}>
						<Heading
							fontSize="xl"
							mb={2}
							as="h3"
							lineHeight="tall"
							color={modalHeaderColor}
						>
							Provide a staging URL
						</Heading>
						<Text fontWeight="400" fontSize="md">
							To trigger a test run, let us know the staging environment we
							should run against.
						</Text>
					</ModalHeader>
					<Divider />
					<ModalCloseButton mt={2} />
					<ModalBody px={6} pb={4} pt={8}>
						<FormControl isRequired>
							<FormLabel>
								Staging URL
								<Tooltip
									label="This is the URL that Meeshkan will run tests against."
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
								ref={register({
									required: true,
								})}
							/>
						</FormControl>
						<FormControl>
							<Checkbox
								name="saveToProject"
								defaultChecked
								mt={6}
								ref={register}
							>
								Save this as my project's staging URL
							</Checkbox>
						</FormControl>
					</ModalBody>

					<ModalFooter px={6} pb={6} mt={8}>
						<Button
							colorScheme="gray"
							mr={6}
							isLoading={testTriggering}
							onClick={onClose}
						>
							cancel
						</Button>
						<LightMode>
							<Button
								colorScheme="blue"
								type="submit"
								isLoading={testTriggering}
							>
								Trigger test run
							</Button>
						</LightMode>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
