import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Card from '../atoms/card';
import CreateProjectForm from '../molecules/create-project-form';
import { CreateTestCases } from '../molecules/create-test-cases';
import { TestRunCadence } from '../molecules/test-run-cadence';
import { useRouter } from 'next/router';

const CreateProject = () => {
	const [step, setStep] = useState<number>(1);
	const [loading, setLoading] = useState(false);
	const [projectName, setProjectName] = useState(null);
	const [projectID, setProjectID] = useState(null);
	const [clientSecret, setClientSecret] = useState(null);
	const router = useRouter();

	const isFirstStep = step === 1;
	const title = isFirstStep
		? 'Create a project'
		: step === 2
			? 'How would you like to create Test Cases?'
			: 'At what cadence would you like test runs to happen?';

	return (
		<Flex
			as={Card}
			align="center"
			justify="space-between"
			direction="column"
			h="100%"
			w="100%"
			p={8}
		>
			<Box>
				<Heading as="h1" fontSize="3xl" mb={8} textAlign="center">
					{title}
				</Heading>
				{step === 1 ? (
					<CreateProjectForm
						setLoading={setLoading}
						setProjectName={setProjectName}
						setStep={setStep}
						step={step}
						setProjectID={setProjectID}
						setClientSecret={setClientSecret}
					/>
				) : step === 2 ? (
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
					onClick={() => (step === 1 ? router.back() : setStep(step - 1))}
				>
					Back
				</Button>
				<Text color="gray.500">Step {step} of 3</Text>
				{step === 3 ? (
					<Button
						onClick={() => router.push(projectName)}
						isLoading={loading}
						loadingText="Loading"
					>
						Finish
					</Button>
				) : (
					<Button
						mt={4}
						type="submit"
						isLoading={loading}
						loadingText="Loading"
						form="form"
					>
						Next step
					</Button>
				)}
			</Flex>
		</Flex>
	);
};

export default CreateProject;
