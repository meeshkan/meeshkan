import {
	ScriptCommandListResponse,
	AuthenticationToken,
	ScriptCommand,
} from '@frontend/meeshkan-types';

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

const topMatterPptr = (
	headless: boolean,
	authTokens?: AuthenticationToken[],
	stagingURL?: string
): string => {
	return (
		`const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: ${headless} });
  const page = await browser.newPage();
  let ddSource;
  let ddDestination;
  let ddSourceBB;
  let ddDestinationBB;

` +
		((authTokens && authTokens.length > 0 && stagingURL)
			? authTokens.map(({ key, value, type }) => type === 'local storage'
				? `  await page.evaluateOnNewDocument(() => { localStorage.setItem(${JSON.stringify(
					key
				)}, ${JSON.stringify(
					value
				)}); });`
				: `  await page.setCookie({ name: ${JSON.stringify(
					key
				)}, value: ${JSON.stringify(
					value
				)}, domain: ${JSON.stringify('.' + new URL(stagingURL).hostname)}  });`
			).join('\n')
			: '')
	);
};
const bottomMatterPptr = `
  await browser.close();
})();`;
interface ScriptToPptrOptions {
	headless: boolean;
}

// TODO: Add support for subdomains
const transformBaseUrlToStagingUrl = (
	originalUrl: string,
	stagingUrl: string
) => {
	const baseUrl = new URL(stagingUrl);
	const newUrl = new URL(originalUrl);
	newUrl.port = baseUrl.port;
	newUrl.protocol = baseUrl.protocol;
	newUrl.hostname = baseUrl.hostname;
	return newUrl.toString();
};

const openToPptrString = ({ value }: Open) =>
	`  // Replace this URL with your stagingURL
	page.goto(${JSON.stringify(value)});`;

const setViewportSizeToPptrString = ({
	value: { xCoord, yCoord },
}: SetViewportSize) =>
	`  await page.setViewport({ width: ${xCoord}, height: ${yCoord}, deviceScaleFactor: 1 });`;

const clickToPptrString = ({
	target: {
		selector: { xpath },
	},
}: Click) => `  await (await page.$x(${JSON.stringify(xpath)}))[0].click();`;

const typeToPptrString = ({
	target: {
		selector: { xpath },
	},
	value,
}: Type) =>
	`  await (await page.$x(${JSON.stringify(xpath)}))[0].type(${JSON.stringify(
		value
	)}, {delay: 100});`;

const dragndropToPptrString = ({
	sourceTarget,
	destinationTarget,
}: Dragndrop) => {
	const isXSame =
		sourceTarget?.coordinates?.xCoord ===
		destinationTarget?.coordinates?.xCoord;

	const isYSame =
		sourceTarget?.coordinates?.yCoord ===
		destinationTarget?.coordinates?.yCoord;

	if (isYSame && isXSame) {
		return `  await (await page.$x(${JSON.stringify(
			sourceTarget.selector.xpath
		)}))[0].click();`;
	} else {
		return `  ddSource = (await page.$x(${JSON.stringify(
			sourceTarget.selector.xpath
		)}))[0];
  ddDestination = (await page.$x(${JSON.stringify(
			destinationTarget.selector.xpath
		)}))[0];
  ddSourceBB = await ddSource.boundingBox();
  ddDestinationBB = await ddDestination.boundingBox();
  await page.mouse.move(ddSourceBB.x + ddSourceBB.width / 2, ddSourceBB.y +   ddSourceBB.height / 2);
  await page.mouse.down();
  await page.mouse.move(ddDestinationBB.x + ddDestinationBB.width / 2, ddDestinationBB.y + ddDestinationBB.height / 2);
  await page.mouse.up();`;
	}
};
interface Open {
	value: string;
}

interface SetViewportSize {
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

const eightBaseToX = (formatter: {
	open: (o: Open) => string;
	setViewportSize: (o: SetViewportSize) => string;
	click: (o: Click) => string;
	type: (o: Type) => string;
	dragndrop: (o: Dragndrop) => string;
}) => (
	script: ScriptCommandListResponse,
	options: ScriptToPptrOptions,
	authTokens?: Array<AuthenticationToken>,
	stagingURL?: string
): string | undefined => {
		if (!script?.count) {
			return undefined;
		}
		const wait = '\n    await new Promise(r => setTimeout(r, 5000));\n';
		const commands = script?.items?.map((event: ScriptCommand) =>
			event?.command === 'open' && event?.value
				? formatter.open({
					value: event.value,
				})
				: event?.command === 'set viewport size' && event?.xCoordinate && event?.yCoordinate
					? formatter.setViewportSize({
						value: {
							xCoord: event.xCoordinate,
							yCoord: event.yCoordinate,
						},
					})
					: event?.command === 'click' && event?.xpath && event?.tagName
						? formatter.click({
							target: {
								selector: {
									xpath: event.xpath,
									selector: n2u(event.selector),
									className: n2u(event.className),
									tagName: event.tagName,
									tagId: n2u(event.tagId),
									innerText: n2u(event.innerText),
								},
								coordinates:
									event?.xCoordinate && event?.yCoordinate
										? {
											xCoord: event.xCoordinate,
											yCoord: event.yCoordinate,
										}
										: undefined,
							},
						})
						: event?.command === 'type' && event?.xpath && event?.tagName && event?.value
							? formatter.type({
								value: event.value,
								target: {
									selector: {
										xpath: event.xpath,
										selector: n2u(event.selector),
										className: n2u(event.className),
										tagName: event.tagName,
										tagId: n2u(event.tagId),
										innerText: n2u(event.innerText),
									},
									coordinates:
										event?.xCoordinate && event?.yCoordinate
											? {
												xCoord: event.xCoordinate,
												yCoord: event.yCoordinate,
											}
											: undefined,
								},
							})
							: event?.command === 'drag and drop' && event?.xpath && event?.tagName && event?.destinationXpath && event?.destinationTagName
								? formatter.dragndrop({
									sourceTarget: {
										selector: {
											xpath: event.xpath,
											selector: n2u(
												event.selector
											),
											className: n2u(
												event.className
											),
											tagName: event.tagName,
											tagId: n2u(event.tagId),
											innerText: n2u(
												event.innerText
											),
										},
										coordinates:
											event?.xCoordinate && event?.yCoordinate
												? {
													xCoord:
														event.xCoordinate,
													yCoord:
														event.yCoordinate,
												}
												: undefined,
									},
									destinationTarget: {
										selector: {
											xpath: event?.destinationXpath,
											selector: n2u(
												event?.destinationSelector
											),
											className: n2u(
												event?.destinationClassName
											),
											tagName: event?.destinationTagName,
											tagId: n2u(
												event?.destinationTagId
											),
											innerText: n2u(
												event?.destinationInnerText
											),
										},
										coordinates:
											event?.destinationXCoordinate && event?.destinationYCoordinate
												? {
													xCoord:
														event.destinationXCoordinate,
													yCoord:
														event.destinationYCoordinate,
												}
												: undefined,
									},
								})
								: undefined
		)
			?.filter(isInhabited)
			?.reduce((a: string, b: string) => a + wait + b, '');
		if (!commands) {
			return undefined;
		}
		return (
			topMatterPptr(options.headless, authTokens, stagingURL) +
			commands +
			wait +
			bottomMatterPptr
		);
	};

export const eightBaseToPptr = eightBaseToX({
	open: openToPptrString,
	setViewportSize: setViewportSizeToPptrString,
	click: clickToPptrString,
	type: typeToPptrString,
	dragndrop: dragndropToPptrString,
});
