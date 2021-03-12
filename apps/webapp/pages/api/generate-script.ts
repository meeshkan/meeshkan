import { NextApiRequest, NextApiResponse } from 'next';
import { eightBaseToPptr } from '@frontend/downloadable-script';
export default async function generateScript(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	try {
		res.setHeader('Content-Type', 'text/javascript');
		res.setHeader('Content-Disposition', `attachment; filename=${req.body.name}.js`);
		res.send(eightBaseToPptr(req.body.script, {
			headless: false,
		}));
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
