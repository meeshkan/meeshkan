import React, { ReactNode, useMemo } from 'react';
import { BoxProps, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

export type DemoPlanProps = {} & BoxProps;

const DemoPlan = ({ ...props }: DemoPlanProps) => {
	return (
		<Alert
			status="info"
			colorScheme="blue"
			mb={4}
			p={3}
			flex="none"
			id="demoPlanCard"
		>
			<AlertIcon />
			<AlertDescription>
				So, um, this is a demo plan and stuff.
			</AlertDescription>
		</Alert>
	);
};

export default DemoPlan;
