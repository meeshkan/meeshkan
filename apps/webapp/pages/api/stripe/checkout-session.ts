import { createSlug } from './../../../utils/createSlug';
import { useContext, useMemo } from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import { createOrRetrieveCustomer, stripe } from '../../../utils/stripe';
import { UserContext } from '../../../utils/user';

const createCheckoutSession = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const user = useContext(UserContext);
	if (req.method === 'POST') {
		const { price, quantity = 1 } = req.body;

		const host = req.headers.host;
		const protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';
		const origin = `${protocol}//${host}`;
		const slugifiedProjectName = useMemo(
			() => createSlug(user?.project?.name),
			[user?.project?.name]
		);

		try {
			const customer = await createOrRetrieveCustomer({
				idToken: user?.idToken,
				projectID: user?.project?.id,
				email: user?.email,
				name: user?.project?.name,
			});

			const session = await stripe.checkout.sessions.create({
				mode: 'subscription',
				payment_method_types: ['card', 'sepa_debit'],
				billing_address_collection: 'required',
				customer,
				client_reference_id: user?.project?.id,
				line_items: [
					{
						price,
						quantity,
					},
				],
				allow_promotion_codes: true,
				success_url: `${origin}/${slugifiedProjectName}`,
				cancel_url: window.location.href,
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
