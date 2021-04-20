import gql from 'graphql-tag';

const PLAN_UPDATE = gql`
	mutation CONFIG_UPDATE(
		$projectID: ID!
		$planDetails: ConfigurationUpdateByFilterInput!
	) {
		configurationUpdateByFilter(
			filter: { project: { id: { equals: $projectID } } }
			data: $planDetails
		) {
			items {
				plan
				stripeCustomerID
				billingInterval
				subscriptionStatus
				subscriptionStartedDate
				project {
					name
				}
			}
		}
	}
`;

const relevantEvents = new Set([
	'checkout.session.completed',
	'checkout.session.async_payment_failed',
	'checkout.session.async_payment_succeeded',
	'customer.subscription.created',
	'customer.subscription.updated',
	'customer.subscription.deleted',
	'charge.succeeded',
	'charge.updated',
	'charge.failed',
	'charge.captured',
	// Savvycal event
	'event.created',
]);

/* Webhook response objects require a statusCode attribute to be specified. A response body can get specified as a stringified JSON object and any custom headers set. */
const responseBuilder = (code = 200, message = undefined, headers = {}) => ({
	body: JSON.stringify({ message }),
	statusCode: code,
	headers,
});

/*The webhook function's handler can be synchronous or asynchronous and is always passed the event, and context (ctx) arguments.*/
module.exports = async (event, ctx) => {
	let response;

	try {
		console.log({ event: event.data }, { ctx });
		/*Access posted data on the event object:*/
		// response = await ctx.api.gqlRequest(PLAN_UPDATE, {
		// 	projectID: event.data.metadata['project id'],
		// 	planDetails: {
		// 		planDetails: {
		// 			plan: {
		// 				set: '',
		// 			},
		// 			billingInterval: {
		// 				set: '',
		// 			},
		// 			subscriptionStatus: {
		// 				set: '',
		// 			},
		// 			subscriptionStartedDate: {
		// 				set: '',
		// 			},
		// 		},
		// 	},
		// });
		/* Handle errors for failed GraphQL mutation */
	} catch (error) {
		return responseBuilder(422, error.message || 'Failed to update plan');
	}

	/* Return final success response */
	return responseBuilder(200, 'Success');
};

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
