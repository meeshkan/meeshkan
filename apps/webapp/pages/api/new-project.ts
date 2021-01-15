export default async (req, res) =>
	fetch(
		'https://hooks.slack.com/services/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',
		{
			method: 'POST',
			mode: 'no-cors',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(req.body),
		}
	).then((response) => {
		if (response.status !== 200) {
			res.status(response.status).send('Slack notification was not sent');
			return;
		}

		return response
			.json()
			.then((data) => {
				res.json(data);
			})
			.catch((error) => {
				res.status(error).send('Not JSON');
			});
	});
