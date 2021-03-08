import React from 'react';
import { SideStep } from '../atoms/side-step';
import { Groups } from '../../utils/user';

const HumanTag = (tag: string) => {
	return tag === ('A' || 'a')
		? 'Link'
		: tag === ('TD' || 'TR')
		? 'Table item'
		: tag === 'LI'
		? 'List item'
		: tag === 'UL'
		? 'Unordered list'
		: tag === 'OL'
		? 'Ordered list'
		: tag === 'INPUT'
		? 'Input'
		: tag === 'SPAN'
		? 'Span'
		: tag === 'TEXTAREA'
		? 'Text input'
		: tag === 'BUTTON'
		? 'Button'
		: tag === 'P'
		? 'Text'
		: tag === 'DIV'
		? 'Div'
		: tag === 'SELECT'
		? 'Dropdown'
		: tag === 'NAV'
		? 'Navigation bar'
		: tag === 'LABEL'
		? 'Form label'
		: tag === 'CODE'
		? 'Code block'
		: tag;
};

const NotNullText = (text: string) => {
	return text ? ` with the inner content of "${text}"` : '';
};

type StepListProps = {
	steps: Groups[];
};

export const StepList = ({ steps }: StepListProps) => {
	return (
		<>
			{steps.map((step, index) => {
				const steps = [];
				step.commands.items.forEach((command) => {
					if (command.open) {
						steps.push(`Open ${command.open.value}.`);
					}
					if (command.setViewportSize) {
						steps.push(
							`Set viewport size to ${command.setViewportSize.value.xCoord}px by ${command.setViewportSize.value.yCoord}px.`
						);
					}
					if (command.click) {
						steps.push(
							`Click ${HumanTag(
								command.click.target.selector.tagName
							)}${NotNullText(command.click.target.selector.innerText)}.`
						);
					}
					if (command.type) {
						steps.push(
							`Type "${command.type.value}" in ${HumanTag(
								command.type.target.selector.tagName
							)}.`
						);
					}

					// Is the source target and destination target the same? return a boolean
					const isXSame =
						command.dragndrop?.sourceTarget?.coordinates?.xCoord ===
						command.dragndrop?.destinationTarget?.coordinates?.xCoord;

					const isYSame =
						command.dragndrop?.sourceTarget?.coordinates?.yCoord ===
						command.dragndrop?.destinationTarget?.coordinates?.yCoord;

					if (command.dragndrop && !isYSame && !isXSame) {
						steps.push(
							`Drag ${HumanTag(
								command.dragndrop.sourceTarget.selector.tagName
							)}${NotNullText(
								command.dragndrop.sourceTarget.selector.innerText
							)} from ${command.dragndrop.sourceTarget.coordinates.xCoord}, ${
								command.dragndrop.sourceTarget.coordinates.yCoord
							}. Then drop at ${
								command.dragndrop.destinationTarget?.coordinates?.xCoord
							}, ${command.dragndrop.destinationTarget?.coordinates?.yCoord}.`
						);
					} else if (command.dragndrop && isYSame && isXSame) {
						steps.push(
							`Click ${HumanTag(
								command.dragndrop.sourceTarget.selector.tagName
							)}${NotNullText(
								command.dragndrop.sourceTarget.selector.innerText
							)}.`
						);
					}
				});

				return (
					<SideStep
						key={index}
						stepName={
							step.name !== null
								? step.name
								: `Untitled group of steps — ${step.gIndex + 1}`
						}
						stepNumber={step.gIndex + 1}
						subSteps={[...steps]}
					/>
				);
			})}
		</>
	);
};
