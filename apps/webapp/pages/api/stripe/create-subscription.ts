import { NextApiRequest, NextApiResponse } from 'next';
import { createOrRetrieveCustomer, stripe } from '../../../utils/stripe';

const CreateSubscription = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { price, projectName, projectID, idToken, email, trial } = req.body;

	try {
		const customer = await createOrRetrieveCustomer({
			idToken: idToken,
			projectID,
			email: email,
			projectName,
		});

		const subscription = await stripe.subscriptions.create({
			customer,
			items: [{ price, quantity: 1 }],
			// Three month trial
			trial_period_days: trial ? 90 : 0,
			metadata: { 'project id': projectID },
		});
		return res.status(200).json({ subscription });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: { statusCode: 500, message: error.message } });
	}
};

export default CreateSubscription;
