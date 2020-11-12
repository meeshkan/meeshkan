import { NextApiRequest, NextApiResponse } from 'next';
import captureWebsite from 'capture-website'
import chrome from 'chrome-aws-lambda'

export default async (request: NextApiRequest, response: NextApiResponse) => {
	const {
		query: {
			url,
		},
	} = request

	try {
		const buffer = await captureWebsite.buffer(decodeURI(String(url)), {
			width: parseInt(process.env.CARD_WIDTH),
			height: parseInt(process.env.CARD_HEIGHT),
			launchOptions: {
				args: chrome.args,
				executablePath: await chrome.executablePath,
				headless: chrome.headless,
			},
		})

		response.setHeader('Content-Type', 'image/png')
		response.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')
		response.end(buffer)
	} catch (error) {
		response.status(500).json({
			status: 'error',
			message: error.message,
		})
	}
}
