import React, { useContext } from 'react';
import CreateProject from '../components/organisms/create-project';
import { UserContext } from '../utils/user';

type NewProjectProps = {
	cookies: string | undefined;
};

const NewProject = ({ cookies }: NewProjectProps) => {
	const { project, setProject } = useContext(UserContext);
	if (project) {
		setProject(null);
	}

	return (
		<CreateProject />
	);
};

export default NewProject;

export { getServerSideProps } from '../components/molecules/chakra';
