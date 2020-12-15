import React from 'react';
import CreateProject from '../components/organisms/create-project';

type NewProjectProps = {
	cookies: string | undefined;
};

const NewProject = ({ cookies }: NewProjectProps) => {
	return (
		<CreateProject />
	);
};

export default NewProject;

export { getServerSideProps } from '../components/molecules/chakra';
