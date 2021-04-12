import React, { useState, useContext } from 'react';
import { Button, Text, Box, Stack, LightMode } from '@chakra-ui/react';
import GridCard from '../molecules/grid-card';
import { useRouter } from 'next/router';
import { UserContext } from '../../utils/user';
import { getStripe } from '../../utils/stripe-client';

const PlanAndBillingCard = () => {
	const [billingInterval, setBillingInterval] = useState('month');
	const [priceIdLoading, setPriceIdLoading] = useState(false);
	const user = useContext(UserContext);

	const postData = async ({ url = '', data = {} }) => {
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

	const handleCheckout = async (price: string) => {
		setPriceIdLoading(true);

		try {
			const { sessionId } = await postData({
				url: '/api/stripe/checkout-session',
				data: {
					price,
					projectName: user?.project?.name,
					projectId: user?.project?.id,
					idToken: user?.idToken,
					email: user?.email,
				},
			});
			await console.log({ sessionId });

			const stripe = await getStripe();
			await stripe.redirectToCheckout({ sessionId });
		} catch (error) {
			return alert(error.message);
		} finally {
			setPriceIdLoading(false);
		}
	};

	return (
		<GridCard
			anchor
			title="Plan and Billing"
			subtitle="Information about the plan you're on and Billing powered by Stripe."
		>
			<Stack direction="row" w="full" spacing={8}>
				<Box
					p={4}
					textAlign="center"
					w="full"
					borderRadius="lg"
					border="1px solid"
					borderColor="gray.200"
				>
					<Text mb={8}>Feedback</Text>{' '}
					<LightMode>
						<Button
							isLoading={priceIdLoading}
							// Test mode feedback monthly
							onClick={() => handleCheckout(`price_1If50lA2WCpbIMtYnlSVlBFo`)}
						>
							Choose the feedback plan
						</Button>
					</LightMode>
				</Box>
				<Box
					p={4}
					textAlign="center"
					w="full"
					borderRadius="lg"
					border="1px solid"
					borderColor="gray.200"
				>
					<Text mb={8}>Business</Text>{' '}
					<LightMode>
						<Button
							// isLoading={priceIdLoading}
							// Free monthly hardcoded
							onClick={() => handleCheckout(`price_1IeQD9A2WCpbIMtYuC0KZchg`)}
						>
							Choose the business plan
						</Button>
					</LightMode>
				</Box>
			</Stack>
			<Box
				p={4}
				mt={8}
				textAlign="center"
				w="full"
				borderRadius="lg"
				border="1px solid"
				borderColor="gray.200"
			>
				<Text mb={8}>Free</Text>{' '}
				<LightMode>
					<Button>Wait for the free plan to be available</Button>
				</LightMode>
			</Box>
		</GridCard>
	);
};

export default PlanAndBillingCard;
