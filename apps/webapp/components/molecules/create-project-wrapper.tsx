import React from 'react';
import { Heading, Text, Box, Flex, Button } from '@chakra-ui/react';
import Card from '../atoms/card';

type CreateProjectWrapperProps = {
	step: number;
	setStep: React.Dispatch<React.SetStateAction<number>>;
	loading: boolean;
};

const CreateProjectWrapper: React.FC<CreateProjectWrapperProps> = ({
	step,
	setStep,
	loading,
	children,
}) => {
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
				{children}
			</Box>
			<Flex justify="space-between" align="center" w="100%">
				<Button
					mt={4}
					colorScheme="gray"
					// @ts-ignore
					onClick={() => (step === 1 ? Router.back() : setStep(step - 1))}
				>
					Back
				</Button>
				<Text color="gray.500">Step {step} of 3</Text>
				{step === 1 ? (
					<Button
						mt={4}
						type="submit"
						isLoading={loading}
						loadingText="Creating project"
						form="form"
					>
						{submitButtonText}
					</Button>
				) : (
					<Button
						onClick={() =>
							// @ts-ignore
							step === 3 ? router.push(projectName) : setStep(step + 1)
						}
					>
						{submitButtonText}
					</Button>
				)}
			</Flex>
		</Flex>
	);
};

export default CreateProjectWrapper;
