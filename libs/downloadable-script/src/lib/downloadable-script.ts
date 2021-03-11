import { SeleniumScript } from '@frontend/meeshkan-types';
import { Either, fold, left, right } from 'fp-ts/Either';
import { flow } from 'fp-ts/lib/function';

function notEmpty<SeleniumCommand>(
	value: SeleniumCommand | null | undefined
): value is SeleniumCommand {
	return value !== null && value !== undefined;
}
interface ScriptTargetSelector {
	xpath: string;
	selector?: string;
	className?: string;
	tagName: string;
	tagId?: string;
	innerText?: string;
}

interface Point {
	xCoord: number;
	yCoord: number;
}

interface ScriptTarget {
	selector: ScriptTargetSelector;
	coordinates?: Point;
}

type ScriptCommand = Either<
	ScriptOpen,
	Either<ScriptSetViewportSize, Either<Click, Either<Type, Dragndrop>>>
>;

const open: (o: ScriptOpen) => ScriptCommand = left;
const setViewportSize: (o: ScriptSetViewportSize) => ScriptCommand = flow(
	left,
	right
);
const click: (o: Click) => ScriptCommand = flow(left, right, right);
const type: (o: Type) => ScriptCommand = flow(left, right, right, right);
const dragndrop: (o: Dragndrop) => ScriptCommand = flow(
	right,
	right,
	right,
	right
);

const scriptPatternMatch = <T>(
	open: (o: ScriptOpen) => T,
	setViewportSize: (s: ScriptSetViewportSize) => T,
	click: (c: Click) => T,
	type: (t: Type) => T,
	dragndrop: (d: Dragndrop) => T
) => (command: ScriptCommand): T =>
	fold(
		open,
		fold(setViewportSize, fold(click, fold(type, dragndrop)))
	)(command);

interface ScriptOpen {
	value: string;
}

interface ScriptSetViewportSize {
	value: Point;
}
interface Click {
	target: ScriptTarget;
}
interface Type {
	target: ScriptTarget;
	value: string;
}
interface Dragndrop {
	sourceTarget: ScriptTarget;
	destinationTarget: ScriptTarget;
}

const eightBaseToSeleniumScript = (
	script: SeleniumScript
): Array<ScriptCommand> =>
	script?.groups?.items
		?.map((group) =>
			group?.commands?.items?.map((command) =>
				command.open && command.open.value
					? open({
							value: command.open.value,
					  })
					: command.setViewportSize &&
					  command.setViewportSize.value &&
					  command.setViewportSize.value.xCoord &&
					  command.setViewportSize.value.yCoord
					? setViewportSize({
							value: {
								xCoord: command.setViewportSize.value.xCoord,
								yCoord: command.setViewportSize.value.yCoord,
							},
					  })
					: command.click &&
					  command.click.target &&
					  command.click.target.selector &&
					  command.click.target.selector.xpath &&
					  command.click.target.selector.tagName
					? click({
							target: {
								selector: {
									xpath: command.click.target.selector.xpath,
									selector: command.click.target.selector.selector,
									className: command.click.target.selector.className,
									tagName: command.click.target.selector.tagName,
									tagId: command.click.target.selector.tagId,
									innerText: command.click.target.selector.innerText,
								},
								coordinates:
									command.click.target.coordinates &&
									command.click.target.coordinates.xCoord &&
									command.click.target.coordinates.yCoord
										? {
												xCoord: command.click.target.coordinates.xCoord,
												yCoord: command.click.target.coordinates.yCoord,
										  }
										: undefined,
							},
					  })
					: command.type &&
					  command.type.target &&
					  command.type.target.selector &&
					  command.type.target.selector.xpath &&
					  command.type.value &&
					  command.type.target.selector.tagName
					? type({
							value: command.type.value,
							target: {
								selector: {
									xpath: command.type.target.selector.xpath,
									selector: command.type.target.selector.selector,
									className: command.type.target.selector.className,
									tagName: command.type.target.selector.tagName,
									tagId: command.type.target.selector.tagId,
									innerText: command.type.target.selector.innerText,
								},
								coordinates:
									command.type.target.coordinates &&
									command.type.target.coordinates.xCoord &&
									command.type.target.coordinates.yCoord
										? {
												xCoord: command.type.target.coordinates.xCoord,
												yCoord: command.type.target.coordinates.yCoord,
										  }
										: undefined,
							},
					  })
					: command.dragndrop &&
					  command.dragndrop.sourceTarget &&
					  command.dragndrop.sourceTarget.selector &&
					  command.dragndrop.sourceTarget.selector.xpath &&
					  command.dragndrop.sourceTarget.selector.tagName &&
					  command.dragndrop.destinationTarget &&
					  command.dragndrop.destinationTarget.selector &&
					  command.dragndrop.destinationTarget.selector.xpath &&
					  command.dragndrop.destinationTarget.selector.tagName
					? dragndrop({
							sourceTarget: {
								selector: {
									xpath: command.dragndrop.sourceTarget.selector.xpath,
									selector: command.dragndrop.sourceTarget.selector.selector,
									className: command.dragndrop.sourceTarget.selector.className,
									tagName: command.dragndrop.sourceTarget.selector.tagName,
									tagId: command.dragndrop.sourceTarget.selector.tagId,
									innerText: command.dragndrop.sourceTarget.selector.innerText,
								},
								coordinates:
									command.dragndrop.sourceTarget.coordinates &&
									command.dragndrop.sourceTarget.coordinates.xCoord &&
									command.dragndrop.sourceTarget.coordinates.yCoord
										? {
												xCoord:
													command.dragndrop.sourceTarget.coordinates.xCoord,
												yCoord:
													command.dragndrop.sourceTarget.coordinates.yCoord,
										  }
										: undefined,
							},
							destinationTarget: {
								selector: {
									xpath: command.dragndrop.destinationTarget.selector.xpath,
									selector:
										command.dragndrop.destinationTarget.selector.selector,
									className:
										command.dragndrop.destinationTarget.selector.className,
									tagName: command.dragndrop.destinationTarget.selector.tagName,
									tagId: command.dragndrop.destinationTarget.selector.tagId,
									innerText:
										command.dragndrop.destinationTarget.selector.innerText,
								},
								coordinates:
									command.dragndrop.destinationTarget.coordinates &&
									command.dragndrop.destinationTarget.coordinates.xCoord &&
									command.dragndrop.destinationTarget.coordinates.yCoord
										? {
												xCoord:
													command.dragndrop.destinationTarget.coordinates
														.xCoord,
												yCoord:
													command.dragndrop.destinationTarget.coordinates
														.yCoord,
										  }
										: undefined,
							},
					  })
					: undefined
			)
		)
		?.filter(notEmpty)
		?.reduce((a, b) => [...a, ...b], []);
