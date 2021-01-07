import { Flex, Heading, Text } from '@chakra-ui/react';
import { NextPage, NextPageContext } from 'next';
import Card from '../components/atoms/card';

type ErrorProps = {
	status: number;
};

const Error: NextPage<ErrorProps> = ({ status }: ErrorProps) => {
	return (
			<Flex as={Card} align="center" justify="center" w="100%">
				<Heading as="h1">{status}</Heading>
				{status !== 404 && (
					<Text fontSize="md">An unexpected error has occured.</Text>
				)}
			</Flex>
	);
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
	const status = res ? res.statusCode : err ? err.statusCode : 404;
	return { status };
};

export default Error;
