import { useState, useContext } from 'react';
import Layout from '../components/templates/layout';
import SideBar from '../components/organisms/sidebar';
import CreateProject from '../components/organisms/create-project';
import withAuth from '../hocs/with-auth';
import { UserContext } from '../utils/user';

type NewProjectProps = {
	cookies: string | undefined;
};

const NewProject = ({ cookies }: NewProjectProps) => {
	const { projects } = useContext(UserContext);
	const [project, setProject] = useState(projects[0] || { id: -1, name: '' });
	return (
		<Layout>
			<SideBar project={project} setProject={setProject} />
			<CreateProject />
		</Layout>
	);
};

export default withAuth(NewProject);

export { getServerSideProps } from '../components/molecules/chakra';
