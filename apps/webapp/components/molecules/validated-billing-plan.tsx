import React, { ReactNode, useContext } from 'react';
import { UserContext } from '../../utils/user';
import SwitchBillingPlanCard from './switch-billing-plan-card';

type ValidatedBillingPlanProps = {
	children: ReactNode;
};

const ValidatedBillingPlan = ({ children }: ValidatedBillingPlanProps) => {
	const { project } = useContext(UserContext);
	const onFreePlan = project?.configuration.plan === 'Free';

	if (onFreePlan) {
		return (
			<SwitchBillingPlanCard />
		);
	}

	return (
		<>{children}</>
	);
};

export default ValidatedBillingPlan;
