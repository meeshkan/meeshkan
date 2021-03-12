import { SeleniumScript } from '@frontend/meeshkan-types';
import { Either, fold, left, right } from 'fp-ts/Either';
import { flow } from 'fp-ts/lib/function';

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

const transformCommand = <T>(c: {
	open: (o: ScriptOpen) => T;
	setViewportSize: (s: ScriptSetViewportSize) => T;
	click: (c: Click) => T;
	type: (t: Type) => T;
	dragndrop: (d: Dragndrop) => T;
}) => (command: ScriptCommand): T =>
	fold(
		c.open,
		fold(c.setViewportSize, fold(c.click, fold(c.type, c.dragndrop)))
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

const n2u = <T>(i: T | null | undefined): T | undefined =>
	i === null ? undefined : i;
function isInhabited<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined;
}
export const eightBaseToScript = (
	script: SeleniumScript
): Array<ScriptCommand> | undefined =>
	script?.groups?.items
		?.map((group) =>
			group?.commands?.items?.map((command) =>
				command?.open?.value
					? open({
							value: command.open.value,
					  })
					: command?.setViewportSize?.value?.xCoord &&
					  command.setViewportSize.value.yCoord
					? setViewportSize({
							value: {
								xCoord: command.setViewportSize.value.xCoord,
								yCoord: command.setViewportSize.value.yCoord,
							},
					  })
					: command?.click?.target?.selector?.xpath &&
					  command.click.target.selector.tagName
					? click({
							target: {
								selector: {
									xpath: command.click.target.selector.xpath,
									selector: n2u(command.click.target.selector.selector),
									className: n2u(command.click.target.selector.className),
									tagName: command.click.target.selector.tagName,
									tagId: n2u(command.click.target.selector.tagId),
									innerText: n2u(command.click.target.selector.innerText),
								},
								coordinates:
									command?.click?.target?.coordinates?.xCoord &&
									command.click.target.coordinates.yCoord
										? {
												xCoord: command.click.target.coordinates.xCoord,
												yCoord: command.click.target.coordinates.yCoord,
										  }
										: undefined,
							},
					  })
					: command?.type?.target?.selector?.xpath &&
					  command?.type?.target?.selector?.tagName &&
					  command?.type?.value
					? type({
							value: command.type.value,
							target: {
								selector: {
									xpath: command.type.target.selector.xpath,
									selector: n2u(command.type.target.selector.selector),
									className: n2u(command.type.target.selector.className),
									tagName: command.type.target.selector.tagName,
									tagId: n2u(command.type.target.selector.tagId),
									innerText: n2u(command.type.target.selector.innerText),
								},
								coordinates:
									command?.type?.target?.coordinates?.xCoord &&
									command.type.target.coordinates.yCoord
										? {
												xCoord: command.type.target.coordinates.xCoord,
												yCoord: command.type.target.coordinates.yCoord,
										  }
										: undefined,
							},
					  })
					: command?.dragndrop?.sourceTarget?.selector?.xpath &&
					  command?.dragndrop?.sourceTarget?.selector?.tagName &&
					  command?.dragndrop?.destinationTarget?.selector?.xpath &&
					  command?.dragndrop?.destinationTarget?.selector?.tagName
					? dragndrop({
							sourceTarget: {
								selector: {
									xpath: command.dragndrop.sourceTarget.selector.xpath,
									selector: n2u(
										command.dragndrop.sourceTarget.selector.selector
									),
									className: n2u(
										command.dragndrop.sourceTarget.selector.className
									),
									tagName: command.dragndrop.sourceTarget.selector.tagName,
									tagId: n2u(command.dragndrop.sourceTarget.selector.tagId),
									innerText: n2u(
										command.dragndrop.sourceTarget.selector.innerText
									),
								},
								coordinates:
									command?.dragndrop?.sourceTarget?.coordinates?.xCoord &&
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
									selector: n2u(
										command.dragndrop.destinationTarget.selector.selector
									),
									className: n2u(
										command.dragndrop.destinationTarget.selector.className
									),
									tagName: command.dragndrop.destinationTarget.selector.tagName,
									tagId: n2u(
										command.dragndrop.destinationTarget.selector.tagId
									),
									innerText: n2u(
										command.dragndrop.destinationTarget.selector.innerText
									),
								},
								coordinates:
									command?.dragndrop?.destinationTarget?.coordinates?.xCoord &&
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
		?.filter(isInhabited)
		?.reduce((a, b) => [...a, ...b], [])
		?.filter(isInhabited);

const topMatterPptr = (
	headless: boolean
): string => `const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: ${headless}});
	const page = await browser.newPage();
	let ddSource;
	let ddDestination;
	let ddSourceBB;
	let ddDestinationBB;`;
const bottomMatterPptr = `
  await browser.close();
})();`;
interface ScriptToPptrOptions {
	headless: boolean;
}
export const scriptToPptr = (
	script: Array<ScriptCommand>,
	options: ScriptToPptrOptions
): string =>
	[
		[topMatterPptr(options.headless)],
		script.map(
			transformCommand({
				open: ({ value }) => `  page.goto(${JSON.stringify(value)});`,
				setViewportSize: ({ value: { xCoord, yCoord } }) =>
					`  await page.setViewport({ width: ${xCoord}, height: ${yCoord}, deviceScaleFactor: 1 });`,
				click: ({
					target: {
						selector: { xpath },
					},
				}) => `  await (await page.$x(${JSON.stringify(xpath)}))[0].click();`,
				type: ({
					target: {
						selector: { xpath },
					},
					value,
				}) =>
					`  await (await page.$x(${JSON.stringify(
						xpath
					)}))[0].type(${JSON.stringify(value)}, {delay: 100});`,
				dragndrop: ({
					sourceTarget,
					destinationTarget,
				}) => `  ddSource = (await page.$x(${JSON.stringify(
					sourceTarget.selector.xpath
				)}))[0];
	ddDestination = (await page.$x(${JSON.stringify(
		destinationTarget.selector.xpath
	)}))[0];
  ddSourceBB = await ddSource.boundingBox();			
  ddDestinationBB = await ddDestination.boundingBox();
	await page.mouse.move(ddSourceBB.x + ddSourceBB.width / 2, ddSourceBB.y + ddSourceBB.height / 2);
	await page.mouse.down();
	await page.mouse.move(ddDestinationBB.x + ddDestinationBB.width / 2, ddDestinationBB.y + ddDestinationBB.height / 2);
	await page.mouse.up();`,
			})
		),
		[bottomMatterPptr],
	]
		.reduce((a, b) => [...a, ...b], [])
		.reduce((a, b) => a + '\n' + b, '');
