import React, { useState } from 'react';
import { Heading, Text, Box, Flex, Button } from '@chakra-ui/react';
import CreateProjectForm from '../molecules/create-project-form';
import UpdateProfileForm from '../molecules/update-profile-form';
import { CreateTestCases } from '../molecules/create-test-cases';
import { TestRunCadence } from '../molecules/test-run-cadence';

const Onboarding = () => {
	const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
	const [loading, setLoading] = useState(false);
	const [projectName, setProjectName] = useState(null);
	const [projectID, setProjectID] = useState(null);
	const [clientSecret, setClientSecret] = useState(null);

	const isFirstStep = step === 1;
	const title = isFirstStep
		? 'Set up your profile'
		: step === 2
		? 'Create your first project'
		: step === 3
		? 'How would you like to create Test Cases?'
		: 'At what cadence would you like test runs to happen?';
	const backButtonVisibility = isFirstStep ? 'hidden' : 'visible';
	const submitButtonText = step === 4 ? 'Finish' : 'Next step';

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
						Onboarding — {title}
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
						<CreateTestCases projectID={projectID} />
					) : (
						<TestRunCadence projectID={projectID} clientSecret={clientSecret} />
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
					{step === 1 ? (
						<Button mt={4} type="submit" isLoading={loading} form="form">
							{submitButtonText}
						</Button>
					) : (
						<Button
							onClick={() =>
								// @ts-ignore
								step === 4 ? router.push(projectName) : setStep(step + 1)
							}
						>
							{submitButtonText}
						</Button>
					)}
				</Flex>
			</>
		</Flex>
	);
};

export default Onboarding;
