import {
	SeleniumScript,
	SeleniumGroup,
	AuthenticationToken,
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
		(authTokens && stagingURL
			? `  await page.setCookie({ name: ${JSON.stringify(
					authTokens[0]?.key
			  )}, value: ${JSON.stringify(
					authTokens[0]?.value
			  )}, domain: ${JSON.stringify(new URL(stagingURL).hostname)}  })`
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
	script: SeleniumScript,
	options: ScriptToPptrOptions,
	authTokens?: Array<AuthenticationToken>,
	stagingURL?: string
): string | undefined => {
	// @ts-expect-error graphql alias causes type error
	if (!script?.groups?.groupItems) {
		return undefined;
	}
	const wait = '\n    await new Promise(r => setTimeout(r, 5000));\n';
	// @ts-expect-error groupItems is an alias and therefore not in the type used here.
	const commands = script?.groups?.groupItems
		?.map((group: SeleniumGroup) =>
			group?.commands?.items?.map((command) =>
				command?.open?.value
					? formatter.open({
							value: command.open.value,
					  })
					: command?.setViewportSize?.value?.xCoord &&
					  command.setViewportSize.value.yCoord
					? formatter.setViewportSize({
							value: {
								xCoord: command.setViewportSize.value.xCoord,
								yCoord: command.setViewportSize.value.yCoord,
							},
					  })
					: command?.click?.target?.selector?.xpath &&
					  command.click.target.selector.tagName
					? formatter.click({
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
					? formatter.type({
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
					? formatter.dragndrop({
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
		?.reduce((a: SeleniumGroup[], b: SeleniumGroup[]) => [...a, ...b], [])
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
