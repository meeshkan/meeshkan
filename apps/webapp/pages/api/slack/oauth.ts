import { NextApiRequest, NextApiResponse } from 'next';
import { eightBaseClient } from '../../../utils/graphql';
import { CREATE_SLACK_CONFIGURATION } from '../../../graphql/project';
import slugify from 'slugify';
import { initAuth0 } from '@auth0/nextjs-auth0';

export default async function slackOauthHook(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const verificationCode = req?.query?.code as string;
	const projectID = req?.query?.state as string;
	const response = await fetch('/api/session');

	console.log(
		`Variables in Slack oauth`,
		{ verificationCode },
		{ projectID },
		{ req },
		{ response: response.json() }
	);
	// const client = eightBaseClient(idToken);

	// if (!verificationCode || !projectID) {
	// 	console.error(
	// 		`The call has verificationCode: ${verificationCode}, and projectID: ${projectID} but needs both to be provided.`
	// 	);
	// 	res
	// 		.status(500)
	// 		.end(
	// 			`The call has verificationCode: ${verificationCode}, and projectID: ${projectID} but needs both to be provided.`
	// 		);
	// }

	// const encodedAuthParams = encodeURIComponent(
	// 	`client_id=${process.env.NEXT_PUBLIC_SLACK_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET}&code=${verificationCode}&redirect_uri=${window?.location?.origin}/api/slack/oauth`
	// );
	// console.log({ encodedAuthParams });

	// try {
	// 	const oauthResponse = await fetch(
	// 		`https://slack.com/api/oauth.access?${encodedAuthParams}`,
	// 		{
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/x-www-form-urlencoded',
	// 			},
	// 		}
	// 	).then((res) => {
	// 		console.log(res.json());
	// 		return res.json();
	// 	});

	// 	let redirectTo;

	// 	if (oauthResponse.ok) {
	// 		const response = await client.request(CREATE_SLACK_CONFIGURATION, {
	// 			projectID,
	// 			accessToken: oauthResponse.access_token,
	// 			webhookChannel: oauthResponse.incoming_webhook.channel,
	// 			webhookChannelID: oauthResponse.incoming_webhook.channel_id,
	// 			webhookURL: oauthResponse.incoming_webhook.url,
	// 			webhookConfigurationURL:
	// 				oauthResponse.incoming_webhook.configuration_url,
	// 		});
	// 		console.log(response);
	// 		redirectTo = slugify(response.project.name);
	// 	}

	// 	res.redirect(`/${redirectTo}`);
	// } catch (error) {
	// 	console.error(error);
	// 	res.status(error.status || 500).end(error.message);
	// }
}

// Next router - query: Object - The query string parsed to an object. It will be an empty object during prerendering if the page doesn't have data fetching requirements. Defaults to {}

// Example response after Oauth handshake
/*{
    "ok": true,
    "access_token": "xoxp-XXXXXXXX-XXXXXXXX-XXXXX",
    "scope": "incoming-webhook,chat:write",
    "user_id": "XXXXXXXX",
    "team_name": "Your Workspace Name",
    "team_id": "XXXXXXXX",
    "incoming_webhook": {
        "channel": "#channel-it-will-post-to",
        "channel_id": "C05002EAE",
        "configuration_url": "https://workspacename.slack.com/services/BXXXXX",
        "url": "https://hooks.slack.com/TXXXXX/BXXXXX/XXXXXXXXXX"
    }
}*/
