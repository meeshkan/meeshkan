import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) =>
	fetch(process.env.SLACK_WEBHOOK, {
		method: 'POST',
		mode: 'no-cors',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(req.body),
	}).then((response) => {
		if (response.status !== 200) {
			res.status(response.status).send('Slack notification was not sent');
			return;
		}

		return response;
	});
