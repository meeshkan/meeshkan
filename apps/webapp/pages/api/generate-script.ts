import { NextApiRequest, NextApiResponse } from 'next';

export default async function generateScript(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	try {
		res.json({ message: 'Generating script...' });
		// TODO: add script generation logic here
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
