import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe>;

export const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
				process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
		);
	}

	return stripePromise;
};

type PostProps = {
	url: string;
	data: Object;
};

export const postData = async ({ url = '', data = {} }: PostProps) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		credentials: 'same-origin',
		body: JSON.stringify(data),
	});

	// @ts-expect-error
	if (res.error) {
		throw new Error('Post request failed.');
	}

	return res.json();
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
		monthlyPrice: '99€',
		yearlyPrice: '950€',
		description:
			'This is the perfect plan if you’re a team looking to get some serious UI-testing done.',
		monthlyPriceId: `price_1JAs16A2WCpbIMtYblbsqYHl`,
		yearlyPriceId: `price_1JAs1nA2WCpbIMtY88WBMHeM`,
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
