import { useContext } from 'react';
import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../utils/stripe';
import { UserContext } from '../../../utils/user';
// import { getURL } from '@/utils/helpers';

const createOrRetrieveCustomer = async ({
	email,
	id,
}: {
	email: string;
	id: string;
}) => {
	// const { data, error } = await supabaseAdmin
	// 	.from('customers')
	// 	.select('stripe_customer_id')
	// 	.eq('id', uuid)
	// 	.single();
	// if (error) {
	// 	// No customer record found, let's create one.
	// 	const customerData = {
	// 		metadata: {
	// 			supabaseUUID: uuid,
	// 		},
	// 	};
	// 	if (email) customerData.email = email;
	// 	const customer = await stripe.customers.create(customerData);
	// 	// Now insert the customer ID into our Supabase mapping table.
	// 	const { error: supabaseError } = await supabaseAdmin
	// 		.from('customers')
	// 		.insert([{ id: uuid, stripe_customer_id: customer.id }]);
	// 	if (supabaseError) throw supabaseError;
	// 	console.log(`New customer created and inserted for ${uuid}.`);
	// 	return customer.id;
	// }
	// if (data) return data.stripe_customer_id;
	return '';
};

const createCheckoutSession = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const user = useContext(UserContext);
	if (req.method === 'POST') {
		const token = req.headers.token;
		const { price, quantity = 1, metadata = {} } = req.body;

		try {
			const customer = await createOrRetrieveCustomer({
				id: user.id,
				email: user.email,
			});

			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				billing_address_collection: 'required',
				customer,
				line_items: [
					{
						price,
						quantity,
					},
				],
				mode: 'subscription',
				allow_promotion_codes: true,
				subscription_data: {
					trial_from_plan: true,
					metadata,
				},
				success_url: /*`${getURL()}/account`*/ '',
				cancel_url: /*`${getURL()}/`*/ '',
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
