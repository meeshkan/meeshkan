import { AppProps } from 'next/app';
import Head from 'next/head';
import withChakra from '../hocs/with-chakra';

const CustomApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Meeshkan Webapp</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default withChakra(CustomApp);
