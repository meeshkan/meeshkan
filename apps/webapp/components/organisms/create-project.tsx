import { useState } from 'react';
import Router from 'next/router';
import { Heading, Box, Flex, Button, Text } from '@chakra-ui/react';
import Card from '../atoms/card';
import CreateProjectForm from '../molecules/create-project-form';

const CreateProject = () => {
	const [step, setStep] = useState<1 | 2 | 3>(1);
	const [loading, setLoading] = useState(false);

	const isFirstStep = step === 1;
	const title = isFirstStep
		? 'Create a project'
		: step === 2
			? 'How would you like to create test cases?'
			: 'At what cadence would you like test runs to happen?';
	const submitButtonText = step === 3 ? 'Finish' : 'Next step';

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
					Onboarding — {title}
				</Heading>
				{step === 1 ? (
					<CreateProjectForm setLoading={setLoading} /*setStep*/ />
				) : step === 2 ? (
					<Box>Create test cases</Box>
				) : (
					<Box>Test run cadence</Box>
				)}
			</Box>
			<Flex justify="space-between" align="center" w="100%">
				<Button mt={4} colorScheme="gray" onClick={() => Router.back()}>
					Back
				</Button>
				<Text color="gray.500">Step {step} of 3</Text>
				<Button
					mt={4}
					type="submit"
					isLoading={loading}
					loadingText="Creating project"
					form="form"
				>
					{submitButtonText}
				</Button>
			</Flex>
		</Flex>
	);
};

export default CreateProject;
