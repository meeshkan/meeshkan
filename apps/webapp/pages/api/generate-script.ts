import { NextApiRequest, NextApiResponse } from 'next';
import { eightBaseToPptr } from '@frontend/downloadable-script';
export default async function generateScript(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	try {
		res.json({
			script: eightBaseToPptr(req.body.script, {
				headless: false,
			}),
		});
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
