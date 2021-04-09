import Stripe from 'stripe';
import { eightBaseClient } from './graphql';
import { GET_STRIPE_ID, UPDATE_PROJECT_WITH_ID } from '../graphql/project';
import useSWR from 'swr';
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
	const fetcher = (query: string) =>
		client.request(query, {
			projectID,
		});

	// Check if project has a stripe customer id
	const { data, error: fetchIdError, isValidating } = useSWR<Project>(
		GET_STRIPE_ID,
		fetcher
	);
	if (fetchIdError)
		throw new Error('there was an issue retrieving the stripe id.');

	if (data.configuration.stripeCustomerID == null && !isValidating) {
		// No customer record found, let's create one.
		const customer = await stripe.customers.create({
			email,
			name,
			metadata: { 'project id': projectID },
		});

		// Now update the project configuration in 8base
		const data = await client.request(UPDATE_PROJECT_WITH_ID, {
			projectID,
			stripeCustomerID: customer?.id,
		});
		console.log(
			`New customer created and inserted for ${data?.configuration?.stripeCustomerID}.`
		);
		return data?.configuration?.stripeCustomerID;
	}
	if (data) return data.configuration.stripeCustomerID;
};
