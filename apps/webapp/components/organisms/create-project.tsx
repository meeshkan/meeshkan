import { useState } from 'react';
import Router from 'next/router';
import { Heading, Box, Flex, Button } from '@chakra-ui/react';
import Card from '../atoms/card';
import CreateProjectForm from '../molecules/create-project-form';
import PlanAndBillingCard from './plan-and-billing';

const CreateProject = () => {
	const [loading, setLoading] = useState(false);
	const [stepNumber, setStepNumber] = useState(1);
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
			<>
				{stepNumber === 1 ? (
					<Box>
						<Heading as="h1" fontSize="3xl" mb={8} textAlign="center">
							Create new project
						</Heading>
						<CreateProjectForm setLoading={setLoading} />
					</Box>
				) : stepNumber === 2 ? (
					<Box>
						<Heading as="h1" fontSize="3xl" mb={8} textAlign="center">
							Choose your plan
						</Heading>
						<PlanAndBillingCard />
					</Box>
				) : (
					'Error'
				)}
			</>
			<Flex justify="space-between" align="center" w="100%">
				<Button mt={4} colorScheme="gray" onClick={() => Router.push('/')}>
					Back
				</Button>
				<Button
					mt={4}
					type="submit"
					isLoading={loading}
					loadingText="Creating project"
					form="form"
				>
					Create project
				</Button>
			</Flex>
		</Flex>
	);
};

export default CreateProject;
