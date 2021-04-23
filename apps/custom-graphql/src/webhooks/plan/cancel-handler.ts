import { FunctionContext, FunctionEvent } from '8base-cli-types';
import {
	CANCEL_OR_DELETE_PLAN,
	DELETE_CUSTOMER,
} from '../../components/graphql-requests';
import { responseBuilder } from '../../components/response-builder';

type WebhookResult = {
	statusCode: number;
	body: string;
};

const relevantEvents = new Set([
	'customer.subscription.updated',
	'customer.subscription.deleted',
	'customer.deleted',
]);

export default async (
	event: FunctionEvent,
	ctx: FunctionContext
): Promise<WebhookResult> => {
	/*Access posted data on the event object:*/
	const stripePayload = JSON.parse(event.body)['data']['object'];
	const projectID = stripePayload['metadata']['project id'];
	const eventType = JSON.parse(event.body)['type'];
	const cancelled: boolean =
		JSON.parse(event.body)['data'].hasOwnProperty('previous_attributes') &&
		JSON.parse(event.body)['data']['previous_attributes'].hasOwnProperty(
			'cancel_at_period_end'
		) &&
		JSON.parse(event.body)['data']['previous_attributes'][
			'cancel_at_period_end'
		] == false;

	// Check if this webhook payload should even be processed
	if (!relevantEvents.has(eventType))
		return responseBuilder(422, `Unknown event to process.`);

	if (projectID === null || projectID === undefined)
		return responseBuilder(
			422,
			`A project id couldn't be found in the metadata`
		);

	// If it should be processed, do different things depending on the event coming in

	if (eventType == 'customer.deleted') {
		await ctx.api.gqlRequest(
			// @ts-ignore
			DELETE_CUSTOMER,
			{ projectID },
			{ checkPermissions: false }
		);
	}

	if (eventType === 'customer.subscription.deleted') {
		await ctx.api.gqlRequest(
			// @ts-ignore
			CANCEL_OR_DELETE_PLAN,
			{ projectID },
			{ checkPermissions: false }
		);
	}

	if (eventType === 'customer.subscription.updated' && cancelled) {
		await ctx.api.gqlRequest(
			// @ts-ignore
			CANCEL_OR_DELETE_PLAN,
			{ projectID },
			{ checkPermissions: false }
		);
	}

	return responseBuilder(200, 'Success');
};
