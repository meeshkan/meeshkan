import React from 'react';
import { SideStep } from '@atoms/side-step';
import { SeleniumGroupListResponse } from '@frontend/meeshkan-types';
import { commandsToSteps } from '@utils/transform-steps';

type StepListProps = {
	steps: SeleniumGroupListResponse['items'];
};

export const StepList = ({ steps }: StepListProps) => {
	const hasMultipleGroups = steps.length > 1;

	return (
		<>
			{steps.map((step, index) => {
				const subSteps = commandsToSteps(step.commands.items);

				if (hasMultipleGroups) {
					return (
						<SideStep
							key={index}
							stepName={
								step.name !== null
									? step.name
									: `Untitled group of steps — ${step.gIndex + 1}`
							}
							stepNumber={step.gIndex + 1}
							subSteps={[...subSteps]}
						/>
					);
				}

				return subSteps.map((sub, index) => (
					<SideStep
						key={sub.sIndex}
						stepName={sub.text}
						stepNumber={sub.sIndex + 1}
					/>
				));
			})}
		</>
	);
};
