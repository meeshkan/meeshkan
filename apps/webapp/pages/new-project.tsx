import React from 'react';
import CreateProject from '../components/organisms/create-project';
import withAuth from '../hocs/with-auth';

type NewProjectProps = {
	cookies: string | undefined;
};

const NewProject = ({ cookies }: NewProjectProps) => {
	return (
		<>
			<CreateProject />
		</>
	);
};

export default withAuth(NewProject);

export { getServerSideProps } from '../components/molecules/chakra';
