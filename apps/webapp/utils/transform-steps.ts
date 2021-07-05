import React from 'react';
import {
	ScriptCommand,
	ScriptCommandListResponse,
} from '@frontend/meeshkan-types';

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
		: tag === 'IMG'
		? 'Image'
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
		: tag === 'HTML'
		? 'Page'
		: tag;
};

export const NotNullText = (text: string) => {
	return text ? ` with the inner content of "${text}"` : '';
};

export const commandsToSteps = (
	commands: ScriptCommandListResponse['items']
) => {
	// @ts-expect-error want to type this, but not set a default value
	const subSteps: [
		{
			text: string;
			sIndex: number;
			command: string;
			tagName?: string;
			scriptCommand: ScriptCommand;
		}
	] = [];
	commands.forEach((commandData) => {
		if (commandData.command === 'open') {
			subSteps.push({
				text: `Open ${commandData.value}.`,
				sIndex: commandData.sIndex,
				command: 'open',
				scriptCommand: commandData,
			});
		}
		if (commandData.command === 'set viewport size') {
			subSteps.push({
				text: `Set viewport size to ${commandData.xCoordinate}px by ${commandData.yCoordinate}px.`,
				sIndex: commandData.sIndex,
				command: 'setViewportSize',
				scriptCommand: commandData,
			});
		}
		if (commandData.command === 'click') {
			subSteps.push({
				text: `Click ${HumanTag(commandData.tagName)}${NotNullText(
					commandData.innerText
				)}.`,
				sIndex: commandData.sIndex,
				command: 'click',
				tagName: HumanTag(commandData.tagName),
				scriptCommand: commandData,
			});
		}
		if (commandData.command === 'type') {
			subSteps.push({
				text: `Type "${commandData.value}" in ${HumanTag(
					commandData.tagName
				)}.`,
				sIndex: commandData.sIndex,
				command: 'type',
				tagName: HumanTag(commandData.tagName),
				scriptCommand: commandData,
			});
		}
		if (commandData.command === 'mouse over') {
			subSteps.push({
				text: `Hover ${HumanTag(commandData.tagName)} at x: ${
					commandData?.xCoordinate
				} and y: ${commandData?.yCoordinate}.`,
				sIndex: commandData.sIndex,
				command: 'mouse over',
				tagName: HumanTag(commandData.tagName),
				scriptCommand: commandData,
			});
		}
		if (commandData.command === 'scroll') {
			subSteps.push({
				text: `Scroll ${
					commandData?.scrollTop !== null && commandData?.scrollTop !== 0
						? (commandData.scrollTop > 0 ? `down ` : `up `) +
						  commandData.scrollTop +
						  ` pixels`
						: ''
				}${
					commandData?.scrollTop !== null &&
					commandData?.scrollTop !== 0 &&
					commandData?.scrollLeft !== null &&
					commandData?.scrollLeft !== 0
						? ` and `
						: ''
				}${
					commandData?.scrollLeft !== null && commandData?.scrollLeft !== 0
						? (commandData.scrollLeft > 0 ? `left ` : `right `) +
						  commandData.scrollLeft +
						  ` pixels`
						: ''
				}.`,
				sIndex: commandData.sIndex,
				command: 'scroll',
				scriptCommand: commandData,
			});
		}

		if (commandData.command === 'execute javascript') {
			subSteps.push({
				text: `Execute custom JavaScript.`,
				sIndex: commandData.sIndex,
				command: 'execute javascript',
				tagName: null,
				scriptCommand: commandData,
			});
		}

		// Is the source target and destination target the same? return a boolean
		const isXSame =
			commandData.command === 'drag and drop' &&
			commandData.xCoordinate === commandData.destinationXCoordinate;

		const isYSame =
			commandData.command === 'drag and drop' &&
			commandData.yCoordinate === commandData.destinationYCoordinate;

		if (commandData.command === 'drag and drop' && !isYSame && !isXSame) {
			subSteps.push({
				text: `Drag ${HumanTag(commandData.tagName)}${NotNullText(
					commandData.innerText
				)} from ${commandData.xCoordinate}, ${
					commandData.yCoordinate
				}. Then drop at ${commandData.destinationYCoordinate}, ${
					commandData.yCoordinate
				}.`,
				sIndex: commandData.sIndex,
				command: 'dragndrop',
				tagName: HumanTag(commandData.tagName),
				scriptCommand: commandData,
			});
		} else if (commandData.command === 'drag and drop' && isYSame && isXSame) {
			subSteps.push({
				text: `Click ${HumanTag(commandData.tagName)}${NotNullText(
					commandData.innerText
				)}.`,
				sIndex: commandData.sIndex,
				command: 'dragndrop',
				tagName: HumanTag(commandData.tagName),
				scriptCommand: commandData,
			});
		}
	});

	return subSteps;
};
