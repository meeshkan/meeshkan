import { useState, useContext } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/templates/layout';
import SideBar from '../components/organisms/sidebar';
import '../components/templates/layout.css';
import { UserContext } from '../utils/user';
import withAuth from '../hocs/with-auth';

const CustomApp = ({ Component, pageProps }: AppProps) => {
	const { projects } = useContext(UserContext);
	const [project, setProject] = useState(projects[0] || { id: -1, name: '' });
	return (
		<>
			<Head>
				<title>Meeshkan Webapp</title>
				<link
					rel="icon"
					href="https://media.graphcms.com/ZUjeEBiaT9iGYxhI5kzq"
				/>
				{/* Meeshkan Recorder */}
				{process.env.NODE_ENV === 'production' ? (
					<script
						async
						src="https://recorder.meeshkan.com/record.js?client_id=ad677264-73c2-4101-b910-28b1d698607c"
					/>
				) : null}
			</Head>
			<Layout>
				<SideBar project={project} setProject={setProject} />
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default withAuth(CustomApp);
