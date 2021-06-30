import React, {
	Dispatch,
	SetStateAction,
	useContext,
	useMemo,
} from 'react';
import { SideStep } from '../atoms/side-step';
import { ScriptCommandListResponse } from '@frontend/meeshkan-types';
import { commandsToSteps } from '../../utils/transform-steps';
import { Box, Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { UserContext } from 'apps/webapp/utils/user';
import { createSlug } from 'apps/webapp/utils/createSlug';
import Link from 'next/link';
import { KeyIcon } from '@frontend/chakra-theme';
import { PlusSquareIcon } from '@chakra-ui/icons';

type StepListProps = {
	steps: ScriptCommandListResponse['items'];
	selectedStep: Number;
	setSelectedStep: Dispatch<SetStateAction<Number>>;
	requiresAuthentication: boolean;
};

const AddStep = () => {
	const borderColor = useColorModeValue('gray.300', 'gray.700');
	return (
		<Flex align="center">
			<Flex
				justify="center"
				align="center"
				borderRadius="full"
				h={6}
				w={6}
				minW={6}
				fontSize="sm"
				mt={2}
				mr={4}
			>
				<PlusSquareIcon boxSize={3} />
			</Flex>
			<Box
				d='flex'
				p={3}
				borderRadius="lg"
				w="full"
				border="1px dashed"
				borderColor={borderColor}
			>
				<Text
					flex="1"
					fontWeight="400"
					lineHeight="1.4"
					fontSize="md"
					wordBreak="break-all"
				>
					Add a new step
				</Text>
			</Box>
		</Flex>
	)
}

export const StepList = ({
	steps,
	selectedStep,
	setSelectedStep,
	requiresAuthentication,
}: StepListProps) => {
	const formattedSteps = commandsToSteps(steps);
	const { project } = useContext(UserContext);
	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);
	const secondaryCardColor = useColorModeValue('gray.200', 'gray.700');

	return (
		<>
			{requiresAuthentication ? (
				project?.configuration?.logInStory ? (
					<Link
						href={`/${slugifiedProjectName}/user-stories/${project?.configuration?.logInStory?.id}`}
					>
						<a>
							<Flex
								align="center"
								justify="center"
								fontSize="sm"
								backgroundColor={secondaryCardColor}
								borderRadius="md"
								p={3}
								mb={4}
							> <KeyIcon mr={3} />
								Log in flow
							</Flex>
						</a>
					</Link>
				) : (
					<Link href={`/${slugifiedProjectName}/settings`}>
						<a>
							<Flex
								align="center"
								justify="center"
								fontSize="sm"
								border="1px dashed"
								borderColor="gray.400"
								borderRadius="md"
								p={3}
							>
								A log in flow is needed
							</Flex>
						</a>
					</Link>
				)
			) : null}

			<AnimatePresence>
				{formattedSteps.map((step, index) => (
					<SideStep
						key={step.sIndex}
						stepName={step.text}
						stepNumber={step.sIndex + 1}
						scriptCommand={step.scriptCommand}
						selectedStep={selectedStep}
						setSelectedStep={setSelectedStep}
					/>
				))}
				<AddStep />
			</AnimatePresence>
			<Flex
				align="center"
				justify="center"
				fontSize="sm"
				backgroundColor={secondaryCardColor}
				borderRadius="md"
				mt={4}
				p={3}
			>
				End of test
			</Flex>
		</>
	);
};
