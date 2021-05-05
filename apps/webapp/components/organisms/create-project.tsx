import { useState } from 'react';
import Router from 'next/router';
import { Heading, Box, Flex, Button } from '@chakra-ui/react';
import Card from '../atoms/card';
import CreateProjectForm from '../molecules/create-project-form';

const CreateProject = () => {
	const [loading, setLoading] = useState(false);
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
					Create new project
				</Heading>
				<CreateProjectForm setLoading={setLoading} />
			</Box>
			<Flex justify="space-between" align="center" w="100%">
				<Button mt={4} colorScheme="gray" onClick={() => Router.back()}>
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
