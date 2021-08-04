import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Text, Heading, Link, useColorModeValue } from '@chakra-ui/react';
import { RadioGroup } from '../atoms/radio-card';
import ScriptTagInput from './script-tag-input';
import { useForm } from 'react-hook-form';

export const CreateTestCases = ({
	projectID,
	step,
	setStep,
}: {
	projectID: string;
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
}) => {
	const [radio, setRadio] = useState('Manually');
	const linkBlueColor = useColorModeValue('blue.500', 'blue.300');
	const { handleSubmit } = useForm();

	const onSubmit = async (): Promise<void> => {
		setStep(step + 1);
	};

	return (
		<Box as='form' w='full' onSubmit={handleSubmit(onSubmit)} id="form">
			<Box>
				<RadioGroup
					options={['Manually', 'Automatically', 'Both']}
					setRadio={setRadio}
				/>

				{radio === 'Manually' && (
					<Box maxW="650px">
						<Heading as="h4" mt={8} mb={3} fontSize="xl">
							Manually, using the chrome extension.
						</Heading>
						<Text>
							<Link
								href="https://chrome.google.com/webstore/detail/meeshkan-recorder/cfjdddhjecoeahjkmegbkakfpppflmgo?hl=en"
								isExternal
								color={linkBlueColor}
							>
								Install the chrome extension.
							</Link>{' '}
							This is is great if you are a developer or product manager
							testing a new feature where user behavior is still unknown but
							you'd like to test it as further development continues.
						</Text>
					</Box>
				)}

				{radio === 'Automatically' && (
					<Box maxW="650px">
						<Heading as="h4" mt={8} mb={3} fontSize="xl">
							Recording production user behavior.
						</Heading>
						<Text mb={4}>
							This is the preferred method of recording as it's the best
							indication of meaningful test coverage. Once a day our Data
							Processing Pipeline will determine viable test cases based on
							your production user behavior and create cases automatically.
						</Text>
						<ScriptTagInput projectID={projectID} />
					</Box>
				)}

				{radio === 'Both' && (
					<>
						<Box maxW="650px" mb={6}>
							<Heading as="h4" mt={8} mb={3} fontSize="xl">
								Manually, using the chrome extension.
							</Heading>
							<Text>
								<Link
									href="https://chrome.google.com/webstore/detail/meeshkan-recorder/cfjdddhjecoeahjkmegbkakfpppflmgo?hl=en"
									isExternal
									color={linkBlueColor}
								>
									Install the chrome extension.
								</Link>{' '}
								This is is great if you are a developer or product manager
								testing a new feature where user behavior is still unknown but
								you'd like to test it as further development continues.
							</Text>
						</Box>
						<Box maxW="650px">
							<Heading as="h4" mt={8} mb={3} fontSize="xl">
								Recording production user behavior.
							</Heading>
							<Text mb={4}>
								This is the preferred method of recording as it's the best
								indication of meaningful test coverage. Once a day our Data
								Processing Pipeline will determine viable test cases based on
								your production user behavior and create cases automatically.
							</Text>
							<ScriptTagInput projectID={projectID} />
						</Box>
					</>
				)}
			</Box>
		</Box>
	);
};
