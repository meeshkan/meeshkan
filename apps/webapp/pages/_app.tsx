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
			</Head>
			<Layout>
				<SideBar project={project} setProject={setProject} />
				<Component {...pageProps} />
			</Layout>
		</>
	);
};

export default withAuth(CustomApp);
