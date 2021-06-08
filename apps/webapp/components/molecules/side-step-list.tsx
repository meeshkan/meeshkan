import React from 'react';
import { SideStep } from '../atoms/side-step';
import { ScriptCommandListResponse } from '@frontend/meeshkan-types';
import { commandsToSteps } from '../../utils/transform-steps';

type StepListProps = {
	steps: ScriptCommandListResponse['items'];
};

export const StepList = ({ steps }: StepListProps) => {
	const formattedSteps = commandsToSteps(steps);

	return (
		<>
			{formattedSteps.map((step) => (
				<SideStep
					key={step.sIndex}
					stepName={step.text}
					stepNumber={step.sIndex + 1}
				/>
			))}
		</>
	)
};
