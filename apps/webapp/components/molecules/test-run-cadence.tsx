import React, {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Box, Text, Heading, FormControl, Stack } from '@chakra-ui/react';
import { RadioGroup } from '../atoms/radio-card';
import CIDocumentationCard from '../../components/organisms/ci-documentation';
import SegmentedControl from './segmented-control';
import { TOGGLE_TEST_RUNS } from '../../graphql/project';
import { UserContext } from '../../utils/user';
import { eightBaseClient } from '../../utils/graphql';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';

export const TestRunCadence = ({
	projectID,
	clientSecret,
	projectName,
	setLoading,
}: {
	setLoading: Dispatch<SetStateAction<boolean>>;
	projectID: string;
	clientSecret: string;
	projectName: string;
}) => {
	const { handleSubmit } = useForm<{}>();

	const router = useRouter();
	const { idToken } = useContext(UserContext);
	const client = eightBaseClient(idToken);
	const [radio, setRadio] = useState('CI/CD');
	const [toggleTestRunnerIndex, setToggleTestRunnerIndex] = useState<
		0 | 1 | null
	>(1);
	const mixpanel = useAnalytics();

	const onSubmit = async (): Promise<void> => {
		setLoading(true);
		mixpanel.track('Set up test run cadence');
		router.push(projectName);
	};
	useEffect(() => {
		const handleTestRunnerToggle = async (): Promise<void> => {
			client.request(TOGGLE_TEST_RUNS, {
				projectId: projectID,
				toggle: !toggleTestRunnerIndex,
			});
		};

		handleTestRunnerToggle();
	}, [toggleTestRunnerIndex]);

	return (
		<Box as="form" w="full" onSubmit={handleSubmit(onSubmit)} id="form">
			<Box>
				<RadioGroup options={['CI/CD', 'Daily']} setRadio={setRadio} />
				{radio === 'Daily' && (
					<Box maxW="800px">
						<Heading as="h4" mt={8} mb={3} fontSize="xl">
							Every 24 hours, 7 days a week
						</Heading>
						<Text>
							If you don't have a CI/CD setup or your app is in maintainence
							mode, this setup could work well for you.
						</Text>

						<FormControl
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							mt={4}
						>
							<Stack mr={5}>
								<Heading fontSize="18px" fontWeight="500">
									Test runner
								</Heading>
								<Text
									fontSize="sm"
									fontWeight="400"
									lineHeight="short"
									color="gray.500"
								>
									Enable the Meeshkan test runner.
								</Text>
							</Stack>
							<SegmentedControl
								values={['on', 'off']}
								selectedIndex={toggleTestRunnerIndex}
								setSelectedIndex={setToggleTestRunnerIndex}
							/>
						</FormControl>
					</Box>
				)}

				{radio === 'CI/CD' && (
					<Box maxW="800px" mt={8} maxH="350px" overflow="auto">
						<CIDocumentationCard manualClientSecret={clientSecret} />
					</Box>
				)}
			</Box>
		</Box>
	);
};
