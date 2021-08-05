import React, { useState } from 'react';
import CreateProjectForm from '../molecules/create-project-form';
import UpdateProfileForm from '../molecules/update-profile-form';
import { CreateTestCases } from '../molecules/create-test-cases';
import { TestRunCadence } from '../molecules/test-run-cadence';
import { Flex, Box, Heading, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Onboarding = () => {
	const [step, setStep] = useState<number>(1);
	const [loading, setLoading] = useState(false);
	const [projectName, setProjectName] = useState(null);
	const [projectID, setProjectID] = useState(null);
	const [clientSecret, setClientSecret] = useState(null);
	const router = useRouter();

	const isFirstStep = step === 1;
	const title = isFirstStep
		? 'Set up your profile'
		: step === 2
			? 'Create your first project'
			: step === 3
				? 'How would you like to create Test Cases?'
				: 'At what cadence would you like test runs to happen?';
	const backButtonVisibility = isFirstStep ? 'hidden' : 'visible';

	return (
		<Flex
			align="center"
			justify="space-between"
			direction="column"
			h="100%"
			w="100%"
			p={8}
		>
			<>
				<Box>
					<Heading as="h1" fontSize="3xl" mb={8} textAlign="center">
						{title}
					</Heading>
					{step === 1 ? (
						<UpdateProfileForm
							setLoading={setLoading}
							setStep={setStep}
							step={step}
						/>
					) : step === 2 ? (
						<CreateProjectForm
							setLoading={setLoading}
							setProjectName={setProjectName}
							setStep={setStep}
							step={step}
							setProjectID={setProjectID}
							setClientSecret={setClientSecret}
						/>
					) : step === 3 ? (
						<CreateTestCases
							projectID={projectID}
							setStep={setStep}
							step={step}
						/>
					) : (
						<TestRunCadence
							projectID={projectID}
							clientSecret={clientSecret}
							projectName={projectName}
							setLoading={setLoading}
						/>
					)}
				</Box>
				<Flex justify="space-between" align="center" w="100%">
					<Button
						mt={4}
						colorScheme="gray"
						onClick={() => setStep(1)}
						visibility={backButtonVisibility}
					>
						Back
					</Button>
					<Text color="gray.500">Step {step} of 4</Text>
					{step === 4 ? (
						<Button onClick={() => router.push(projectName)} loadingText="Finishing up">
							Finish
						</Button>
					) : (
						<Button mt={4} type="submit" isLoading={loading} form="form" loadingText="Loading">
							Next step
						</Button>
					)}
				</Flex>
			</>
		</Flex>
	);
};

export default Onboarding;
