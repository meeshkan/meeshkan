import { createOrRetrieveCustomer, stripe } from '../../../utils/stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSlug } from '../../../utils/createSlug';

const createPortalLink = async (req: NextApiRequest, res: NextApiResponse) => {
	const { idToken, projectID, email, projectName } = req.body;

	const host = req.headers.host;
	const protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';
	const origin = `${protocol}//${host}`;

	if (req.method === 'POST') {
		try {
			const customer = await createOrRetrieveCustomer({
				idToken,
				projectID,
				email,
				projectName,
			});

			const { url } = await stripe.billingPortal.sessions.create({
				customer,
				return_url: `${origin}/${createSlug(
					projectName
				)}/settings#plan-and-billing`,
			});
			console.log(url);

			return res.status(200).json({ url });
		} catch (err) {
			console.log(err);
			res
				.status(500)
				.json({ error: { statusCode: 500, message: err.message } });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};

export default createPortalLink;
