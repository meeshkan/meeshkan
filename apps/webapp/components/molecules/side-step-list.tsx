import React from 'react';
import { StoryStep } from '../atoms/side-step';

export const StepList = ({ steps }) =>
	steps.map((step, index) => (
		<StoryStep
			key={index}
			stepName={step.command}
			stepNumber={index + 1}
			subSteps={[step.target]}
		/>
	));
