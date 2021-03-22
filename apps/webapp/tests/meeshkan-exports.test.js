import 'expect-puppeteer';

describe('Save an authentication token', () => {
	beforeAll(async () => {
		await page.setCookie({
			name: 'a0:session',
			value: process.env.COOKIE,
			domain:
				process.env.TEST_URL === 'http://localhost:3000'
					? 'localhost'
					: process.env.TEST_URL,
		});
		await page.goto(
			`${process.env.TEST_URL == 'http://localhost:3000' ? null : 'https://'}${
				process.env.TEST_URL
			}/meeshkan-webapp`
		);
		await page.setViewport({
			width: 1813,
			height: 1057,
			deviceScaleFactor: 1,
		});
		await new Promise((r) => setTimeout(r, 3000));
	});

	it('loads the dashboard', async () => {
		await expect(page).toMatch('Confidence score');
	});

	it('should navigate to the settings page', async () => {
		const button = await page.$x(
			'/html/body/div[1]/div/nav/div/div[4]/div/button[2]'
		);
		await button[0].click();
		await new Promise((r) => setTimeout(r, 3000));
	});

	it('fills out the form', async () => {
		// Navigate to the details section
		const link = await page.$x(
			'/html/body/div[1]/div/nav/div/div[2]/div[2]/div/div[2]/a[3]'
		);
		await link[0].click();

		// Fill in the key input
		const input1 = await page.$x(
			'/html/body/div[1]/div/div/div/div[6]/form/div[2]/input'
		);
		await input1[0].click();
		await (
			await page.$x('/html/body/div[1]/div/div/div/div[6]/form/div[2]/input')
		)[0].type('test', { delay: 100 });

		// Fill in the value input
		const input2 = await page.$x(
			'/html/body/div[1]/div/div/div/div[6]/form/div[2]/input'
		);
		await input2[0].click();
		await (
			await page.$x('/html/body/div[1]/div/div/div/div[6]/form/div[3]/input')
		)[0].type('hello-world', { delay: 100 });

		// Asserts the form should be filled
		await expect(page).toFillForm('form[name="createAnAuthenticationToken"]', {
			key: 'test',
			value: 'hello-world',
		});
	});

	it('clicks submit on the form', async () => {
		await page.click('button', { text: 'Save token' });

		await expect(page).toClick('button', { text: 'Save token' });
	});

	it('deletes the token', async () => {
		const button1 = await page.$x(
			'/html/body/div[1]/div/div/div/div[6]/div[5]/button'
		);
		await button1[0].click();

		await expect(page).not.toMatch('hello-world');
	});
});
