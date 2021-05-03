import { FunctionContext, FunctionEvent } from '8base-cli-types';
import { responseBuilder } from '../../components/response-builder';

type WebhookResult = {
	statusCode: number;
	body: string;
};

const relevantEvents = new Set([
	'event.created',
	'event.rescheduled',
	'event.cancelled',
]);

export default async (
	event: FunctionEvent,
	ctx: FunctionContext
): Promise<WebhookResult> => {
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

	if (!relevantEvents.has(eventType)) {
		return responseBuilder(422, `Unknown event to process.`);
	}

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
	return responseBuilder(200, 'Success');
};
