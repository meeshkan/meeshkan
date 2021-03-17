const puppeteer = require('puppeteer');

describe('Save an authentication token', () => {
	beforeAll(async () => {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		let ddSource;
		let ddDestination;
		let ddSourceBB;
		let ddDestinationBB;
		await new Promise((r) => setTimeout(r, 5000));

		await new Promise((r) => setTimeout(r, 5000));
		page.goto('https://app.meeshkan.com/meeshkan-webapp');
		await new Promise((r) => setTimeout(r, 5000));
		await page.setViewport({ width: 1813, height: 1057, deviceScaleFactor: 1 });
		await new Promise((r) => setTimeout(r, 5000));
		ddSource = (
			await page.$x('/html/body/div[1]/div/div/div/div[6]/form/div[2]/input')
		)[0];
		ddDestination = (
			await page.$x('/html/body/div[1]/div/div/div/div[6]/form/div[2]/input')
		)[0];
		ddSourceBB = await ddSource.boundingBox();
		ddDestinationBB = await ddDestination.boundingBox();
		await page.mouse.move(
			ddSourceBB.x + ddSourceBB.width / 2,
			ddSourceBB.y + ddSourceBB.height / 2
		);
		await page.mouse.down();
		await page.mouse.move(
			ddDestinationBB.x + ddDestinationBB.width / 2,
			ddDestinationBB.y + ddDestinationBB.height / 2
		);
		await page.mouse.up();
		await new Promise((r) => setTimeout(r, 5000));
		await (
			await page.$x('/html/body/div[1]/div/div/div/div[6]/form/div[2]/input')
		)[0].type('a0:session', { delay: 100 });
		await new Promise((r) => setTimeout(r, 5000));
		ddSource = (
			await page.$x('/html/body/div[1]/div/div/div/div[6]/form/div[3]/input')
		)[0];
		ddDestination = (
			await page.$x('/html/body/div[1]/div/div/div/div[6]/form/div[3]/input')
		)[0];
		ddSourceBB = await ddSource.boundingBox();
		ddDestinationBB = await ddDestination.boundingBox();
		await page.mouse.move(
			ddSourceBB.x + ddSourceBB.width / 2,
			ddSourceBB.y + ddSourceBB.height / 2
		);
		await page.mouse.down();
		await page.mouse.move(
			ddDestinationBB.x + ddDestinationBB.width / 2,
			ddDestinationBB.y + ddDestinationBB.height / 2
		);
		await page.mouse.up();
		await new Promise((r) => setTimeout(r, 5000));
		await (
			await page.$x('/html/body/div[1]/div/div/div/div[6]/form/div[3]/input')
		)[0].type('hello-world', { delay: 100 });
		await new Promise((r) => setTimeout(r, 5000));
		ddSource = (
			await page.$x('/html/body/div[1]/div/div/div/div[6]/form/button')
		)[0];
		ddDestination = (
			await page.$x('/html/body/div[1]/div/div/div/div[6]/form/button')
		)[0];
		ddSourceBB = await ddSource.boundingBox();
		ddDestinationBB = await ddDestination.boundingBox();
		await page.mouse.move(
			ddSourceBB.x + ddSourceBB.width / 2,
			ddSourceBB.y + ddSourceBB.height / 2
		);
		await page.mouse.down();
		await page.mouse.move(
			ddDestinationBB.x + ddDestinationBB.width / 2,
			ddDestinationBB.y + ddDestinationBB.height / 2
		);
		await page.mouse.up();
		await new Promise((r) => setTimeout(r, 5000));

		await browser.close();
	});

	// TODO: add actual assertion
	it('a new token should exist', async () => {
		await expect(
			page
				.$x('/html/body/div[1]/div/div/div/div[6]/form/button')
				.resolves.toMatch('a0:session')
		);
	});
});
