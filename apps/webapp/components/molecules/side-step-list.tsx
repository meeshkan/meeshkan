import React, { Dispatch, SetStateAction, useState } from 'react';
import { SideStep } from '../atoms/side-step';
import { ScriptCommandListResponse } from '@frontend/meeshkan-types';
import { commandsToSteps } from '../../utils/transform-steps';
import { Flex } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

type StepListProps = {
	steps: ScriptCommandListResponse['items'];
	selectedStep: Number;
	setSelectedStep: Dispatch<SetStateAction<Number>>;
};

export const StepList = ({
	steps,
	selectedStep,
	setSelectedStep,
}: StepListProps) => {
	const formattedSteps = commandsToSteps(steps);

	return (
		<>
			<Flex
				align="center"
				justify="center"
				fontSize="sm"
				backgroundColor="gray.200"
				borderRadius="md"
				p={3}
			>
				Log in flow
			</Flex>
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
			</AnimatePresence>
			<Flex
				align="center"
				justify="center"
				fontSize="sm"
				backgroundColor="gray.200"
				borderRadius="md"
				p={3}
			>
				End of test
			</Flex>
		</>
	);
};
