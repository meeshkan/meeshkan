import React from 'react';
import CreateProject from '@organisms/create-project';

type NewProjectProps = {
	cookies: string | undefined;
};

const NewProject = ({ cookies }: NewProjectProps) => {
	return <CreateProject />;
};

export default NewProject;

export { getServerSideProps } from '@molecules/chakra';
