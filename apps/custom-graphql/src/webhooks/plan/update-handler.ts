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
	const cancelled: boolean =
		JSON.parse(event.body)['data'].hasOwnProperty('previous_attributes') &&
		JSON.parse(event.body)['data']['previous_attributes'].hasOwnProperty(
			'cancel_at_period_end'
		) &&
		JSON.parse(event.body)['data']['previous_attributes'][
			'cancel_at_period_end'
		] == false;
	const subscriptionStatus =
		!cancelled &&
		stripePayload.hasOwnProperty('status') &&
		stripePayload['status'];
	const subscriptionStartedDate = new Date(
		JSON.parse(event.body)['created'] * 1000
	);
	const eventType = JSON.parse(event.body)['type'];

	// Check if this webhook payload should even be processed
	if (!relevantEvents.has(eventType)) {
		return responseBuilder(422, `Unknown event to process.`);
	}

	if (!projectID) {
		return responseBuilder(
			422,
			`A project id couldn't be found in the metadata`
		);
	}

	if (relevantEvents.has(eventType) && !cancelled) {
		await ctx.api.gqlRequest(
			// @ts-expect-error
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
					subscriptionStatus: {
						set: subscriptionStatus,
					},
					subscriptionStartedDate: {
						set: subscriptionStartedDate,
					},
				},
			},
			{ checkPermissions: false }
		);
	}

	return responseBuilder(200, 'Success');
};
