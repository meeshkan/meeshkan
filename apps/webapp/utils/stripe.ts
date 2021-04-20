import Stripe from 'stripe';
import { eightBaseClient } from './graphql';
import { GET_STRIPE_ID, UPDATE_PROJECT_WITH_ID } from '../graphql/project';

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
	projectName,
	idToken,
}: {
	email: string;
	projectID: string;
	projectName: string;
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
			name: projectName,
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

// Information to support Stripe Plans setup in the webapp
export const Plans = {
	free: {
		monthlyPrice: '0€',
		yearlyPrice: '0€',
		description: 'Wait and be notified when a free plan is available.',
		monthlyPriceId: `price_1IhzoRA2WCpbIMtYoVejfHkS`,
		yearlyPriceId: `price_1IgRElA2WCpbIMtYvllLMJzH`,
		features: [''],
	},

	feedback: {
		monthlyPrice: '45€',
		yearlyPrice: '432€',
		// All feedback plans are free
		discountedMonthly: '0€',
		discountedYearly: '0€',
		description:
			'Have a 30 minute call fortnightly with the Meeshkan team to offer insight into your workflow.',
		monthlyPriceId: `price_1IfZ4BA2WCpbIMtY7s89W6J2`,
		yearlyPriceId: `price_1IfZ4ZA2WCpbIMtYVPbGvJGc`,
		features: [
			'User generated tests',
			'30 test runs per month',
			'No-code test creation',
			'Unlimited team members',
			'5 Concurrent Tests',
			'3 month data retention',
		],
	},

	business: {
		monthlyPrice: '75€',
		yearlyPrice: '720€',
		description:
			'This is the perfect plan if you’re a team looking to get some serious UI-testing done.',
		// 29.99
		monthlyPriceId: `price_1IfZ2jA2WCpbIMtYL4iWIbvg`,
		// 20% discount 288.00
		yearlyPriceId: `price_1IfZ2yA2WCpbIMtYJludWHEh`,
		features: [
			'User generated tests',
			'100+ test runs per month',
			'No-code test creation',
			'Unlimited team members',
			'30+ Concurrent Tests',
			'9 month data retention',
			'Video of test cases and outcomes',
		],
	},
};
