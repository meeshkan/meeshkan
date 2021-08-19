import React, { useState } from 'react';
import {
	BoxProps,
	Alert,
	AlertIcon,
	AlertDescription,
	CloseButton,
} from '@chakra-ui/react';

const DemoPlan = (props: BoxProps) => {
	const [open, setOpen] = useState(true);
	if (open === false) {
		return null;
	}

	return (
		<Alert
			status="info"
			colorScheme="blue"
			mb={0}
			p={3}
			flex="none"
			id="demoPlanCard"
			{...props}
		>
			<AlertIcon />
			<AlertDescription>
				You're currently viewing the demo plan. Actions are limited on this
				project, create a new one to run tests and create new test cases.
			</AlertDescription>
			<CloseButton
				mixBlendMode="multiply"
				onClick={() => setOpen(false)}
				size="sm"
				position="absolute"
				right="4px"
				top="6px"
			/>
		</Alert>
	);
};

export default DemoPlan;
