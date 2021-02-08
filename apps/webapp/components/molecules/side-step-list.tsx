import React from 'react';
import { StoryStep } from '../atoms/side-step';

export const StepList = ({ steps }) =>
	steps.map((step, index) => {
		const steps = [];
		typeof step.target == 'string' ? steps.push(step.target) : null;
		typeof step.target == 'object' ? steps.push(step.target.selector) : null;
		typeof step.target == 'object' &&
		step.target.hasOwnProperty('inner_text') &&
		step.target.inner_text !== null &&
		step.target.tag_name !== null
			? steps.push(
					`${
						step.target.tag_name == 'A'
							? 'Link'
							: step.target.tag_name == 'TD'
							? 'Table item'
							: step.target.tag_name == 'LI'
							? 'List item'
							: step.target.tag_name
					} with inner text of ${step.target.inner_text}`
			  )
			: null;

		return (
			<StoryStep
				key={index}
				stepName={step.command}
				stepNumber={index + 1}
				subSteps={[...steps]}
			/>
		);
	});
