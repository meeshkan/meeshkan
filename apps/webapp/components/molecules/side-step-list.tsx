import React from 'react';
import { StoryStep } from '../atoms/side-step';

const HumanTag = (tag: string) => {
	return tag === 'A'
		? 'Link'
		: tag === 'TD'
		? 'Table item'
		: tag === 'LI'
		? 'List item'
		: tag === 'INPUT'
		? 'Input'
		: tag === 'SPAN'
		? 'Span'
		: tag === 'TEXTAREA'
		? 'Text input'
		: tag;
};

const NotNullText = (text: string) => {
	return text !== null || undefined ? ` with the inner text of "${text}"` : '';
};

export const StepList = ({ steps }) =>
	steps.map((step, index) => {
		const steps = [];
		step.commands.items.forEach((command) => {
			if (command.open !== null) {
				steps.push(`Open ${command.open.value}.`);
			}
			if (command.setViewportSize !== null) {
				steps.push(
					`Set viewport size to ${command.setViewportSize.value.xCoord}px by ${command.setViewportSize.value.yCoord}px.`
				);
			}
			if (command.click !== null) {
				steps.push(
					`Click ${HumanTag(
						command.click.target.selector.tagName
					)}${NotNullText(command.click.target.selector.innerText)}.`
				);
			}
			if (command.type !== null) {
				steps.push(
					`Type "${command.type.value}" in ${HumanTag(
						command.type.target.selector.tagName
					)}.`
				);
			}
			if (command.dragndrop !== null) {
				steps.push(
					`Drag ${HumanTag(
						command.dragndrop.sourceTarget.selector.tagName
					)}${NotNullText(
						command.dragndrop.sourceTarget.selector.innerText
					)} from ${command.dragndrop.sourceTarget.coordinates.xCoord}, ${
						command.dragndrop.sourceTarget.coordinates.yCoord
					}. Then drop at ${
						command.dragndrop.destinationTarget.coordinates.xCoord
					}, ${command.dragndrop.destinationTarget.coordinates.yCoord}.`
				);
			}
		});

		return (
			<StoryStep
				key={index}
				stepName={
					step.name !== null ? step.name : `Group of steps #${index + 1}`
				}
				stepNumber={index + 1}
				subSteps={[...steps]}
			/>
		);
	});
