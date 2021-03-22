import 'expect-puppeteer';

describe('Save an authentication token', () => {
	beforeAll(async () => {
		await page.setCookie({
			name: 'a0:session',
			value:
				'Fe26.2**60029cb5ae72235e69f9b26a6cb0d97ad9406c73df2b0664b944c4e5e9ec5631*eZEUaVEUDwxi7sw87cem4g*b05t0HJ9mmGL9wieqiLSVjw3N6LZSgcnsrJU2XAMVDW0ONYrMA79QoImZtwuxSgvW_8Fq712P_JgYTQ6ai3hXg8scD7ajAakcUFa294XEBIQLtKn6rLr3S7ZV5d9zkdy-AYeg_9x1Uq3duw4DJiZB0phGOwYnaW5F-oKa7EeRC6PwVq8BHgnYf5QQD_cJPJLDFEzm3XvZNofar1F-cpSDPf01dFqJyL6QsXwuBGhW7onUavmgvo_DReE9cm1QBYurPClwARA0mDHAPySC9hhgVKoIoZoKgQQC4qKeixRnR34D3B9wgP3QrbQWVLaeJ3Sc1uHT5yM9CSd-yH9WSeW8aSJq9hpgNlDglLYmbbMY8QUmRLUg2ubK_j0qZc43jiHDTtexCwe-p5Ttf2jN97erfqX8Sgem__s4KA6nau8JAOJZf0qeCYL6EE3jIHuwc4nrkYvUhIurPqsbABZNaiON6hfezM418S9fC-tTBvCEWDq_GwqKj_ASF1RTDAGOMsIkYrxgO9sutHmAGkS89RjMXirowOIlqhLrl-lphRSrD676JXAcQZjXXpGSRnSMDpFU-DkskspeBspn14-WYtk0B58hI1Q8EaYpCp7fl68Wus74kc78aOKkt5dLIhIUGVomc63WP_GSoKFHLDwAVxm8L7xszfRIlUzaoc9fbj1Y0NeIHyALrB5Cb9-i3fIcoMG7hKmz59GPMMAB5ja2ubSUo5necQtKL0Jmsokl-SEvy5YS4g2T9lQRI9V8e4OyxgQbNIFsyoIGewfUGRD0HfeusgoN1rwubHCxCN9Ny202sxeXS2mZD7RRRtfpaRLvJf12hanEtzzXEKP7xdKlRSn2WAZcAttYNz7fBx_Ko_R557aVo3dXFQk2hRekAvMTUeXnVrB3WPmFxFdOamUDE-CC8FsH8WUKbhlfKkPTEFasVmBVYL5MFfj9qW2cDmbYxtu7wvDphj5nnOx2GK2ewkqAoYE2oplkEycTqsDmuN65FKeydb7dAAj7S4is16U8dySBUEs6BEfGS7vG5KdVufEj_N5lOh11wPm8kqUP8qxHTU8_pNz4Q-aTKrJRH339e5qYAOO3MqofIRSp2l4Eix9ToE30Ob9Em5-1HHTq-9CbF4upZFnlAyiIvrQFEh28Sfqnxvxyouy6OTwSOcnPbBDINdaDgomwzMsVG3XV25_ZWocsxc7jsRO84BzBQCjcKOEqtNP09HfbvX52Uh6toBEeTt1KOZdN3gy4EKEvtRTZwu22BACX6g2NFAcLzVC_LNIxrmlBIi4_mbBPWh4IIzKWt1ZMirfWOwKAikiXXB9B17Gl_vZOhonvo_XRteS2JmUfy-vMjcjO83ovdnHf609dLf5uUWaxjxh2tt-2BcRwxqWM0W2JLYMelN9-qeEaSguIZGgIHKgKe65MxRNEQZmAwWuOFiEFLWJhA3iX5J5XgkLTGcfs7JETU0UUOusndSBCXj9zsEZgQOvHIWAozJi_cmDZfEFT7gl_GzTgtPEBsDwWeMVr8NVkYJQVqkiwmMx4BFapT4EQi02bUBhs4KTQIIxVuAQGtPen0jmzt6IJv7Axkr9ey7epgxy13Ol0uf2wV15PpLZHT8isWLsacPKmGmMjDSlCuqt9eMURMs0tSbIrIFUQvLf_8dYaMlkbxmqyC5kRZK_K7nrRe73yp5IR6ymPS7Czal32bw8TbxIwqisaF7OOk-tRbmO4xa4p_t4eNgYdP-OhHGwAptCjGtBRZs8IQ3VIXoY5r-5eol8mDv6yCBrDdBrUM4ZEpKV1atio4EN7lAJcyzVhiep8-9Z02gKlCp9pmv1Amzozg1AgDDrb5qpIDAM5OdXYR3mOyK201tTqOQUH00I5O4pjBuKRlj2_PD_3bUv_qwMLQR-CrI**137ae6d9ab5dd04dafdbc79c83ee124d0b253daac9a0f0eee4579c3d935cf3ee*_hjq44dpLBcegmLiRvxKje4VFxDHNUruTvRjnj6Cu_w',
			domain:
				process.env.TEST_URL === 'localhost:3000'
					? 'localhost'
					: process.env.TEST_URL,
		});
		await page.goto(
			`${process.env.TEST_URL == 'localhost:3000' ? 'http://' : 'https://'}${
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

		await new Promise((r) => setTimeout(r, 3000));
		await expect(page).not.toMatch('hello-world');
	});
});
