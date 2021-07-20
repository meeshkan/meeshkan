import React from 'react';
import { Box } from '@chakra-ui/react';
import { RadioGroup } from '../atoms/radio-card';

export const CreateTestCases = () => {
	return (
		<Box>
			<RadioGroup options={['Manually', 'Automatically', 'Both']} />
		</Box>
	);
};
