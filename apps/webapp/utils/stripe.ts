import Stripe from 'stripe';
import { eightBaseClient } from './graphql';
import { GET_STRIPE_ID, UPDATE_PROJECT_WITH_ID } from '../graphql/project';
import { Project } from '@frontend/meeshkan-types';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
	appInfo: {
		name: 'Meeshkan webapp',
		version: '0.1.0',
	},
});

export const createOrRetrieveCustomer = async ({
	email,
	projectID,
	name,
	idToken,
}: {
	email: string;
	projectID: string;
	name: string;
	idToken: string;
}) => {
	const client = eightBaseClient(idToken);

	// Check if project has a stripe customer id
	const data = await client.request(GET_STRIPE_ID, {
		projectID,
	});

	// Customer was found, return the id
	if (data?.project?.configuration?.stripeCustomerID) {
		await console.log(
			`A customer id was found ${data.project.configuration.stripeCustomerID}.`
		);
		return data.project.configuration.stripeCustomerID;
	} else {
		// No customer record found, let's create one.
		const customer = await stripe.customers.create({
			email,
			name,
			metadata: { 'project id': projectID },
		});

		// Now update the project configuration in 8base
		const newData = await client.request(UPDATE_PROJECT_WITH_ID, {
			projectID,
			stripeCustomerID: customer?.id,
		});
		const newCustomer = await newData?.projectUpdate?.configuration
			?.stripeCustomerID;

		await console.log(`New customer created and inserted for ${newCustomer}.`);
		return newCustomer;
	}
};
