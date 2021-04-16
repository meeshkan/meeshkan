import { createSlug } from './../../../utils/createSlug';
import { NextApiRequest, NextApiResponse } from 'next';
import { createOrRetrieveCustomer, stripe } from '../../../utils/stripe';

const createCheckoutSession = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	if (req.method === 'POST') {
		const {
			price,
			projectName,
			projectId,
			idToken,
			email,
			metadata = {},
		} = req.body;

		const host = req.headers.host;
		const protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';
		const origin = `${protocol}//${host}`;

		try {
			const customer = await createOrRetrieveCustomer({
				idToken: idToken,
				projectID: projectId,
				email: email,
				projectName,
			});

			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				customer,
				line_items: [
					{
						price,
						quantity: 1,
					},
				],
				mode: 'subscription',
				allow_promotion_codes: true,
				subscription_data: {
					trial_from_plan: true,
					metadata,
				},
				success_url: `${origin}/${createSlug(projectName)}`,
				cancel_url: `${origin}/${createSlug(
					projectName
				)}/settings#plan-and-billing`,
			});

			return res.status(200).json({ sessionId: session.id });
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

export default createCheckoutSession;
