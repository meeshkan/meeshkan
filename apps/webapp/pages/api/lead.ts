import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const createLead = async (req: NextApiRequest, res: NextApiResponse) => {
	const resolved = await req.body;
	const { email, location } = JSON.parse(resolved);

	await console.log({ email }, { location });

	if (email && location) {
		res.status(200).send(`success`);
		console.log('Correct data sent.');

		// Intercom create lead
		let intercomLead;
		try {
			intercomLead = await fetch('https://api.intercom.io/contacts', {
				method: 'POST',
				headers: {
					Authorization:
						'Bearer dG9rOjcwMzdmYzAzXzdmMjdfNGIzN184ZThiXzFhOGFkN2JmMTUxZDoxOjA=',
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					role: 'lead',
					email,
					owner_id: '4208214',
				}),
			});
			intercomLead = await intercomLead.json();
			console.log(
				`Intercom lead successfully created for ${intercomLead.email}.`
			);
		} catch (error) {
			console.error(error);
			return;
		}

		// Tag new lead from intercom
		let leadTags;
		try {
			leadTags = await fetch(
				`https://api.intercom.io/contacts/${intercomLead.id}/tags`,
				{
					method: 'POST',
					headers: {
						Authorization:
							'Bearer dG9rOjcwMzdmYzAzXzdmMjdfNGIzN184ZThiXzFhOGFkN2JmMTUxZDoxOjA=',
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({
						id:
							location === 'pricing'
								? '5369099'
								: location === 'roadmap'
								? '5373731'
								: location === 'changelog'
								? '5373732'
								: location === 'callout'
								? '5369100'
								: null,
					}),
				}
			);
			const tags = await leadTags.json();
			console.log('Intercom lead successfully tagged.', { tags });
		} catch (error) {
			console.error(error);
			return;
		}

		// // Send Slack notification about the new lead
		try {
			await fetch(
				'https://hooks.slack.com/services/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',
				{
					method: 'POST',
					// mode: 'no-cors',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({
						blocks: [
							{
								type: 'section',
								text: {
									type: 'mrkdwn',
									text: `A lead has entered their email into *${location}* 📝 on the website. Their email is: ${email}.`,
								},
							},
							{
								type: 'section',
								text: {
									type: 'mrkdwn',
									text: 'An Intercom lead has been created',
								},
								accessory: {
									type: 'button',
									text: {
										type: 'plain_text',
										text: 'Visit contact',
										emoji: true,
									},
									style: 'primary',
									url: `https://app.intercom.com/a/apps/nou4ik17/users/${intercomLead.id}/all-conversations`,
								},
							},
						],
					}),
				}
			).then(async (res) =>
				res.status === 200
					? console.log('Sent the slack notification.')
					: console.log("Couldn't send the slack notification.")
			);
		} catch (error) {
			console.error(error);
			return;
		}
	} else {
		res.status(422).send(`Both an email and location need to be provided.`);
		console.error(`Both an email and location need to be provided.`);
		return;
	}
};

export default createLead;
