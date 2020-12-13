import { Flex, Heading, Text } from '@chakra-ui/react';
import { NextPage, NextPageContext } from 'next';
import ChakraProvider from '../components/molecules/chakra';

type ErrorProps = {
	status: number;
};

const Error: NextPage<ErrorProps> = ({ status }: ErrorProps) => {
	return (
		<ChakraProvider cookies={undefined}>
			<Flex align="center" justify="center" direction="column" h="100vh">
				<Heading as="h1">{status}</Heading>
				{status !== 404 && (
					<Text fontSize="md">An unexpected error has occured.</Text>
				)}
			</Flex>
		</ChakraProvider>
	);
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
	const status = res ? res.statusCode : err ? err.statusCode : 404;
	return { status };
};

export default Error;
