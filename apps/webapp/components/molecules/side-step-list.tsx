import React from 'react';
import { SideStep } from '../atoms/side-step';
import { Groups } from '../../utils/user';

const HumanTag = (tag: string) => {
	return tag === 'A' || 'a'
		? 'Link'
		: tag === 'TD' || 'TR'
		? 'Table item'
		: tag === 'LI'
		? 'List item'
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
		: tag;
};

const NotNullText = (text: string) => {
	return text ? ` with the inner text of ${text}` : '';
};

type StepListProps = {
	steps: Groups[];
};

export const StepList = ({ steps }: StepListProps) => {
	const hasMultipleGroups = steps.length > 1;

	return (
		<>
			{steps.map((step, index) => {
				const subSteps = [];
				step.commands.items.forEach((command) => {
					if (command.open) {
						subSteps.push({
							text: `Open ${command.open.value}.`,
							sIndex: command.sIndex,
						});
					}
					if (command.setViewportSize) {
						subSteps.push({
							text: `Set viewport size to ${command.setViewportSize.value.xCoord}px by ${command.setViewportSize.value.yCoord}px.`,
							sIndex: command.sIndex,
						});
					}
					if (command.click) {
						subSteps.push({
							text: `Click ${HumanTag(
								command.click.target.selector.tagName
							)}${NotNullText(command.click.target.selector.innerText)}.`,
							sIndex: command.sIndex,
						});
					}
					if (command.type) {
						subSteps.push({
							text: `Type "${command.type.value}" in ${HumanTag(
								command.type.target.selector.tagName
							)}.`,
							sIndex: command.sIndex,
						});
					}
					if (command.dragndrop) {
						subSteps.push({
							text: `Drag ${HumanTag(
								command.dragndrop.sourceTarget.selector.tagName
							)}${NotNullText(
								command.dragndrop.sourceTarget.selector.innerText
							)} from ${command.dragndrop.sourceTarget.coordinates.xCoord}, ${
								command.dragndrop.sourceTarget.coordinates.yCoord
							}. Then drop at ${
								command.dragndrop.destinationTarget.coordinates.xCoord
							}, ${command.dragndrop.destinationTarget.coordinates.yCoord}.`,
							sIndex: command.sIndex,
						});
					}
				});

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

				return (
					<>
						{subSteps.map((sub, index) => {
							console.log(sub);
							return (
								<SideStep
									key={index + 'a'}
									stepName={sub.text}
									stepNumber={sub.sIndex + 1}
									subSteps={[]}
								/>
							);
						})}
					</>
				);
			})}
		</>
	);
};
