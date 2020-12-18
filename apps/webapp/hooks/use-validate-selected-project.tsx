import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { createSlug } from '../utils/createSlug';
import { UserContext } from '../utils/user';

export const useValidateSelectedProject = () => {
	const [loading, setLoading] = useState(true);
	const { projects, project, setProject } = useContext(UserContext);
	const router = useRouter();
	const { projectName } = router.query;

	useEffect(() => {
		const selectedProject = projects.find(
			(project) => createSlug(project.name) === projectName
		);

		setLoading(project.id === -1);
		selectedProject ? setProject(selectedProject) : router.push('/404');
	}, [projectName, projects, setProject, router]);

	return { loading };
};
