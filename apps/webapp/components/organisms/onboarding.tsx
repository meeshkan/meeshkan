import { useState } from 'react';
import { Heading, Text, Box, Flex, Button } from '@chakra-ui/react';
import CreateProjectForm from '@molecules/create-project-form';
import UpdateProfileForm from '@molecules/update-profile-form';

const Onboarding = () => {
	const [step, setStep] = useState<1 | 2>(1);
	const [loading, setLoading] = useState(false);

	const isFirstStep = step === 1;
	const title = isFirstStep
		? 'Set up your profile'
		: 'Create your first project';
	const backButtonVisibility = isFirstStep ? 'hidden' : 'visible';
	const submitButtonText = isFirstStep ? 'Next step' : 'Create project';

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
						<UpdateProfileForm setLoading={setLoading} setStep={setStep} />
					) : (
						<CreateProjectForm setLoading={setLoading} />
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
					<Text color="gray.500">Step {step} of 2</Text>
					<Button mt={4} type="submit" isLoading={loading} form="form">
						{submitButtonText}
					</Button>
				</Flex>
			</>
		</Flex>
	);
};

export default Onboarding;
