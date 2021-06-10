import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { createSlug } from '../utils/createSlug';
import { UserContext } from '../utils/user';
import { getProject } from '../utils/project';

export const useValidateSelectedProject = () => {
	const [loading, setLoading] = useState(true);
	const [found, setFound] = useState(true);
	const { idToken, projects, project, setProject, loadingProject, setLoadingProject } = useContext(UserContext);
	const router = useRouter();
	const { projectName } = router.query;

	useEffect(() => {
		const fetchProject = async () => {
			const selectedProject = projects.find(
				(project) => createSlug(project?.name || '') === projectName
			);

			let fetchedProject = project;
			if (selectedProject) {
				if (selectedProject.id !== project?.id) {
					setLoadingProject(true);
					fetchedProject = await getProject(idToken, selectedProject.id);
					setProject(fetchedProject);
					setLoadingProject(false);
				} else {
					getProject(idToken, selectedProject.id).then(setProject);
				}
			}

			if (fetchedProject) {
				setLoading(false);
				setFound(true);
			} else {
				setLoading(false);
				setFound(false);
			}
		};

		fetchProject();
	}, [projectName, projects, setProject]);

	return { found, loading: loading || loadingProject };
};
