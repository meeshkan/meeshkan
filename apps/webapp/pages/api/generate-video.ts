export default async (req, res) =>
	fetch(
		'https://sfcyq4tmok.execute-api.eu-west-1.amazonaws.com/staging/make-video',
		{
			method: 'POST',
			mode: 'no-cors',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(req.body),
		}
	).then((response) => {
		if (response.status !== 200) {
			res.status(response.status).send('Video generation had an issue');
			return;
		}

		return response;
	});
