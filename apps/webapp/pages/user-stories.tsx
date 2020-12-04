import Layout from '../components/templates/layout';
import {
	Box,
	Stack,
	Text,
	useColorModeValue,
	Flex,
	Button,
} from '@chakra-ui/react';
import Card from '../components/atoms/card';
import GridCard from '../components/molecules/grid-card';
import { BookIcon, ChatIcon, PlusIcon } from '@frontend/chakra-theme';
import { transparentize } from '@chakra-ui/theme-tools';
import SegmentedControl from '../components/molecules/segmented-control';
import { motion, AnimateSharedLayout } from 'framer-motion';

function StartButton({ icon, text }) {
	return (
		<Box
			d="flex"
			alignItems="center"
			// @ts-ignore
			backgroundColor={useColorModeValue(
				'cyan.50',
				transparentize('cyan.500', 0.15)
			)}
			color={useColorModeValue('cyan.700', 'cyan.50')}
			fontWeight={600}
			p={4}
			w="100%"
			borderRadius="md"
		>
			{icon}
			<Text ml={4}>{text}</Text>
		</Box>
	);
}

const UserStoriesPage = () => {
	return (
		<Layout>
			<Stack p={[6, 0, 0, 0]} w="100%" rounded="lg" spacing={6}>
				<GridCard title="Getting started">
					<Stack direction="row" spacing="32px">
						<StartButton
							icon={
								<BookIcon
									boxSize={8}
									color={useColorModeValue('cyan.500', 'cyan.300')}
									strokeWidth="2.5"
								/>
							}
							text="Read the documentation"
						/>
						<StartButton
							icon={
								<ChatIcon
									boxSize={8}
									color={useColorModeValue('cyan.500', 'cyan.300')}
									strokeWidth="2.5"
								/>
							}
							text="Chat with an expert"
						/>
						<Box
							d="flex"
							alignItems="center"
							border="1px dashed"
							// @ts-ignore
							borderColor={useColorModeValue('gray.500', 'gray.400')}
							fontWeight={600}
							p={4}
							w="100%"
							borderRadius="md"
						>
							<PlusIcon
								boxSize={8}
								color={useColorModeValue('gray.500', 'gray.400')}
								strokeWidth="2.5"
							/>
							<Text ml={4}>Create a new user story</Text>
						</Box>
					</Stack>
				</GridCard>
				<Box>
					<Flex justify="space-between" align="center">
						<SegmentedControl values={['Recordings', 'Test cases']} />
						<Button size="sm">Review recordings</Button>
					</Flex>
					<Card borderTopLeftRadius="0">
						<Box>yo</Box>
					</Card>
				</Box>
			</Stack>
		</Layout>
	);
};

export { getServerSideProps } from '../components/molecules/chakra';

export default UserStoriesPage;
