import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import PlanAndBillingCard from '../organisms/plan-and-billing';
import Card from '../atoms/card';

const SwitchPlanCard = () => {
	return (
		<Card w="full" h="min-content">
			<Alert status="info" mb={8}>
				<AlertIcon />
				<AlertTitle mb={0}>You are on the free plan.</AlertTitle>
				We will notify you when free functionality is exposed. If you'd
				like earlier acccess, feel free to upgrade.
			</Alert>
			<PlanAndBillingCard />
		</Card>
	);
};

export default SwitchPlanCard;
