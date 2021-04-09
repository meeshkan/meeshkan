import gql from 'graphql-tag';

const INVOICE_MUTATION = gql`
	mutation Invoice($id: ID!, $state: STRING!) {
		invoiceUpdate(data: { id: $id, state: $state }) {
			id
			state
			customer {
				name
				email
			}
		}
	}
`;

/**
 * Webhook response objects require a statusCode attribute to be specified.
 * A response body can get specified as a stringified JSON object and any
 * custom headers set.
 */
const responseBuilder = (code = 200, message = undefined, headers = {}) => ({
	body: JSON.stringify({ message }),
	statusCode: code,
	headers,
});

// const getWebhookEvent = ({ req }) => {
// 	try {
// 		return stripe.webhooks.constructEvent(
// 			req.body,
// 			req.headers['stripe-signature'] as string,
// 			process.env.STRIPE_WEBHOOK_SECRET
// 		);
// 	} catch (error) {
// 		throw responseBuilder(400, `webhook error: ${error.message}`);
// 	}
// };

/**
 * The webhook function's handler can be synchronous or asynchronous and
 * is always passed the event, and context (ctx) arguments.
 */
module.exports = async (event, ctx) => {
	let response;

	try {
		/**
		 * Access posted data on the event object:
		 * {
		 *   "invoiceId": <invoiceID>,
		 *   "chargeType": <chargeType>
		 * }
		 */
		response = await ctx.api.gqlRequest(INVOICE_MUTATION, {
			id: event.data.invoiceId,
			state: event.data.chargeType,
		});
		/* Handle errors for failed GraphQL mutation */
	} catch (e) {
		return responseBuilder(422, 'Failed to update invoice');
	}

	/* Return final success response */
	return responseBuilder(200, 'Success');
};

// ---------- Code example
// import { stripe } from '../../../utils/stripe';
// // import {
// // 	upsertProductRecord,
// // 	upsertPriceRecord,
// // 	manageSubscriptionStatusChange,
// // } from '@/utils/useDatabase';
// import { NextApiRequest, NextApiResponse } from 'next';

// // Stripe requires the raw body to construct the event.
// export const config = {
// 	api: {
// 		bodyParser: false,
// 	},
// };

// async function buffer(readable: any) {
// 	const chunks = [];
// 	for await (const chunk of readable) {
// 		chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
// 	}
// 	return Buffer.concat(chunks);
// }

// const relevantEvents = new Set([
// 	'product.created',
// 	'product.updated',
// 	'price.created',
// 	'price.updated',
// 	'checkout.session.completed',
// 	'customer.subscription.created',
// 	'customer.subscription.updated',
// 	'customer.subscription.deleted',
// ]);

// const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
// 	if (req.method === 'POST') {
// 		const buf = await buffer(req);
// 		const sig = req.headers['stripe-signature'];
// 		const webhookSecret =
// 			process.env.STRIPE_WEBHOOK_SECRET_LIVE ??
// 			process.env.STRIPE_WEBHOOK_SECRET;
// 		let event;

// 		try {
// 			event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
// 		} catch (err) {
// 			console.log(`❌ Error message: ${err.message}`);
// 			return res.status(400).send(`Webhook Error: ${err.message}`);
// 		}

// 		if (relevantEvents.has(event.type)) {
// 			try {
// 				switch (event.type) {
// 					case 'product.created':
// 					case 'product.updated':
// 						await upsertProductRecord(event.data.object);
// 						break;
// 					case 'price.created':
// 					case 'price.updated':
// 						await upsertPriceRecord(event.data.object);
// 						break;
// 					case 'customer.subscription.created':
// 					case 'customer.subscription.updated':
// 					case 'customer.subscription.deleted':
// 						await manageSubscriptionStatusChange(
// 							event.data.object.id,
// 							event.data.object.customer,
// 							event.type === 'customer.subscription.created'
// 						);
// 						break;
// 					case 'checkout.session.completed':
// 						const checkoutSession = event.data.object;
// 						if (checkoutSession.mode === 'subscription') {
// 							const subscriptionId = checkoutSession.subscription;
// 							await manageSubscriptionStatusChange(
// 								subscriptionId,
// 								checkoutSession.customer,
// 								true
// 							);
// 						}
// 						break;
// 					default:
// 						throw new Error('Unhandled relevant event!');
// 				}
// 			} catch (error) {
// 				console.log(error);
// 				return res.json({ error: 'Webhook handler failed. View logs.' });
// 			}
// 		}

// 		res.json({ received: true });
// 	} else {
// 		res.setHeader('Allow', 'POST');
// 		res.status(405).end('Method Not Allowed');
// 	}
// };

// export default webhookHandler;
