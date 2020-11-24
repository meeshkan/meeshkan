import { AppProps } from 'next/app';
import Head from 'next/head';

const CustomApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Meeshkan Webapp</title>
				{/* Meeshkan Recorder */}
				<script
					async
					src="https://recorder.meeshkan.com/record.js?client_id=ad677264-73c2-4101-b910-28b1d698607c"
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default CustomApp;
