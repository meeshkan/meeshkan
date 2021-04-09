import { useContext } from 'react';
import { UserContext } from './../../../utils/user';
import { createOrRetrieveCustomer, stripe } from '../../../utils/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const createPortalLink = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const user = useContext(UserContext);

		try {
			const customer = await createOrRetrieveCustomer({
				idToken: user?.idToken,
				projectID: user?.project?.id,
				email: user?.email,
				name: user?.project?.name,
			});

			const { url } = await stripe.billingPortal.sessions.create({
				customer,
				return_url: window.location.href,
			});

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
