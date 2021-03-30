import React from 'react';
import { SeleniumCommandListResponse } from '@frontend/meeshkan-types';

export const HumanTag = (tag: string): string => {
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
		: tag === 'VIDEO'
		? 'Video'
		: tag;
};

export const NotNullText = (text: string) => {
	return text ? ` with the inner content of "${text}"` : '';
};

export const commandsToSteps = (
	commands: SeleniumCommandListResponse['items']
) => {
	// @ts-expect-error want to type this, but not set a default value
	const subSteps: [
		{ text: string; sIndex: number; command: string; tagName?: string }
	] = [];
	commands.forEach((command) => {
		if (command.open) {
			subSteps.push({
				text: `Open ${command.open.value}.`,
				sIndex: command.sIndex,
				command: 'open',
			});
		}
		if (command.setViewportSize) {
			subSteps.push({
				text: `Set viewport size to ${command.setViewportSize.value.xCoord}px by ${command.setViewportSize.value.yCoord}px.`,
				sIndex: command.sIndex,
				command: 'setViewportSize',
			});
		}
		if (command.click) {
			subSteps.push({
				text: `Click ${HumanTag(
					command.click.target.selector.tagName
				)}${NotNullText(command.click.target.selector.innerText)}.`,
				sIndex: command.sIndex,
				command: 'click',
				tagName: HumanTag(command.click.target.selector.tagName),
			});
		}
		if (command.type) {
			subSteps.push({
				text: `Type "${command.type.value}" in ${HumanTag(
					command.type.target.selector.tagName
				)}.`,
				sIndex: command.sIndex,
				command: 'type',
				tagName: HumanTag(command.type.target.selector.tagName),
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
				command: 'dragndrop',
				tagName: HumanTag(command.dragndrop.sourceTarget.selector.tagName),
			});
		} else if (command.dragndrop && isYSame && isXSame) {
			subSteps.push({
				text: `Click ${HumanTag(
					command.dragndrop.sourceTarget.selector.tagName
				)}${NotNullText(command.dragndrop.sourceTarget.selector.innerText)}.`,
				sIndex: command.sIndex,
				command: 'dragndrop',
				tagName: HumanTag(command.dragndrop.sourceTarget.selector.tagName),
			});
		}
	});

	return subSteps;
};
