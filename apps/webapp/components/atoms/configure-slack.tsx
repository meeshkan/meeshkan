import React from 'react';
import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { SlackLogoIcon } from '@frontend/chakra-theme';

export const SlackIntegration = () => {
	return (
		<>
			<Flex alignItems="center" justifyContent="space-between">
				<Stack mr={5}>
					<Flex align="center">
						<SlackLogoIcon mr={3} />
						<Heading fontSize="18px" fontWeight="500">
							Slack notifications
						</Heading>
					</Flex>
					<Text
						fontSize="sm"
						fontWeight="400"
						lineHeight="short"
						color="gray.500"
					>
						Install the slack app to recieve notifications when a test fails.
					</Text>
				</Stack>

				<Button
					colorScheme="gray"
					variant="outline"
					as="a"
					href={`https://slack.com/oauth/v2/authorize?scope=incoming-webhook&client_id=${
						process.env.SLACK_CLIENT_ID
					}&redirect_uri=${
						window?.location?.host /*+ window?.location?.pathname*/
					}`}
				>
					Configure
				</Button>
			</Flex>
		</>
	);
};
