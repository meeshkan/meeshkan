import React from 'react';
import { SideStep } from '../atoms/side-step';
import { SeleniumGroupListResponse } from '@frontend/meeshkan-types';

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
	steps: SeleniumGroupListResponse['items'];
};

export const StepList = ({ steps }: StepListProps) => {
	const hasMultipleGroups = steps.length > 1;

	return (
		<>
			{steps.map((step, index) => {
				// @ts-ignore ** want to type this, but not set a default value
				let subSteps: [{ text: string; sIndex: number }] = [];
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
						console.log(command.sIndex);
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

					// Is the source target and destination target the same? return a boolean
					const isXSame =
						command.dragndrop?.sourceTarget?.coordinates?.xCoord ===
						command.dragndrop?.destinationTarget?.coordinates?.xCoord;

					const isYSame =
						command.dragndrop?.sourceTarget?.coordinates?.yCoord ===
						command.dragndrop?.destinationTarget?.coordinates?.yCoord;

					if (command.dragndrop && !isYSame && !isXSame) {
						subSteps.push({
							text: `Drag ${HumanTag(
								command.dragndrop.sourceTarget.selector.tagName
							)}${NotNullText(
								command.dragndrop.sourceTarget.selector.innerText
							)} from ${command.dragndrop.sourceTarget.coordinates.xCoord}, ${
								command.dragndrop.sourceTarget.coordinates.yCoord
							}. Then drop at ${
								command.dragndrop.destinationTarget?.coordinates?.xCoord
							}, ${command.dragndrop.destinationTarget?.coordinates?.yCoord}.`,
							sIndex: command.sIndex,
						});
					} else if (command.dragndrop && isYSame && isXSame) {
						subSteps.push({
							text: `Click ${HumanTag(
								command.dragndrop.sourceTarget.selector.tagName
							)}${NotNullText(
								command.dragndrop.sourceTarget.selector.innerText
							)}.`,
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
								/>
							);
						})}
					</>
				);
			})}
		</>
	);
};
