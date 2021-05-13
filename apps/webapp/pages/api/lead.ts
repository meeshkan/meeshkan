import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { email, location } = JSON.parse(req.body);

	if (email && location) {
		res.status(200).end(`success`);
	} else {
		res.status(422).end(`Unknown event to process.`);
		console.error(`Unknown event to process.`, { req });
	}

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
		await console.log(
			`Successfully created intercom lead for ${
				// @ts-expect-error
				JSON.parse(intercomLead.body).email
			}`,
			{ intercomLead }
		);
	} catch (error) {
		console.error(error);
	}

	// Tag new lead from intercom
	// @ts-expect-error
	const { id } = JSON.parse(intercomLead.body);
	try {
		let leadTags = await fetch(`https://api.intercom.io/contacts/${id}/tags`, {
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
		});
		await console.log(`Successfully tagged the intercom lead`, { leadTags });
	} catch (error) {
		console.error(error);
	}

	// Send Slack notification about the new lead
	try {
		await fetch(
			'https://hooks.slack.com/services/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',
			{
				method: 'POST',
				mode: 'no-cors',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					text: `A lead has entered their email into **${location}** form on the website. \n\n Their email is: ${email}.`,
				}),
			}
		);
		await console.log('Sent the slack notification');
	} catch (error) {
		console.error(error);
	}
};
