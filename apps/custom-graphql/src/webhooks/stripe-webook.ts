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
