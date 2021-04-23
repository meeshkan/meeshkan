import { FunctionContext, FunctionEvent } from '8base-cli-types';
import { PLAN_UPDATE } from '../../components/graphql-requests';
import { responseBuilder } from '../../components/response-builder';

type WebhookResult = {
	statusCode: number;
	body: string;
};

const plans = {
	free: 'prod_JJ3LUkSBbgR8j0',
	feedback: 'prod_JAI3521ORwEUmn',
	business: 'prod_JAI4NZ98T60Rqn',
};

const relevantEvents = new Set([
	'checkout.session.completed',
	'customer.subscription.created',
	'customer.subscription.updated',
	// Savvycal event
	'event.created',
]);

export default async (
	event: FunctionEvent,
	ctx: FunctionContext
): Promise<WebhookResult> => {
	/*Access posted data on the event object:*/
	const stripePayload = JSON.parse(event.body)['data']['object'];
	const product = stripePayload['plan']['product'];
	const projectID = stripePayload['metadata']['project id'];
	const planName =
		product == plans.free
			? 'Free'
			: product == plans.feedback
			? 'Feedback'
			: product == plans.business
			? 'Business'
			: undefined;
	const billingInterval =
		stripePayload['plan']['interval'] == 'month' ? 'monthly' : 'yearly';
	const subscriptionStatus = '';
	const subscriptionStartedDate = new Date(
		JSON.parse(event.body)['created'] * 1000
	);
	const eventType = JSON.parse(event.body)['type'];
	const savvyScheduler =
		eventType == 'event.created'
			? `${JSON.parse(event.body)['payload']['scheduler']['display_name']} | ${
					JSON.parse(event.body)['payload']['scheduler']['email']
			  } | ${
					JSON.parse(event.body)['payload']['scheduler']['response_status']
			  }`
			: null;
	const savvyDate =
		eventType == 'event.created'
			? new Date(JSON.parse(event.body)['payload']['start_at'])
			: null;

	// Check if this webhook payload should even be processed
	if (!relevantEvents.has(eventType))
		return responseBuilder(422, `Unknown event to process.`);

	if (projectID === null || projectID === undefined)
		return responseBuilder(
			422,
			`A project id couldn't be found in the metadata`
		);

	if (eventType == 'event.created') {
		fetch(
			'https://hooks.slack.com/services/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',
			{
				method: 'POST',
				mode: 'no-cors',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					text: `*A new Feedback plan scheduled a CAB call! 🎉* \n\n Scheduled by: ${savvyScheduler} \n Scheduled for: \`${savvyDate.toLocaleDateString(
						'en-US',
						{
							hour: 'numeric',
							minute: 'numeric',
							second: 'numeric',
							hour12: false,
							day: 'numeric',
							month: 'short',
							timeZoneName: 'short',
						}
					)} \``,
				}),
			}
		).then((response) => {
			if (response.status !== 200) {
				return responseBuilder(
					response.status,
					'Slack notification was not sent'
				);
			}

			return response;
		});
	}

	await ctx.api
		.gqlRequest(
			PLAN_UPDATE,
			{
				projectID,
				planDetails: {
					plan: {
						set: planName,
					},
					billingInterval: {
						set: billingInterval,
					},
					// subscriptionStatus: {
					// 	set: subscriptionStatus,
					// },
					subscriptionStartedDate: {
						set: subscriptionStartedDate,
					},
				},
			},
			{ checkPermissions: false }
		)
		.then((result) => console.log({ result }));

	return responseBuilder(200, 'Success');
};
