import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { createSlug } from '@utils/createSlug';
import { UserContext } from '@utils/user';

export const useValidateSelectedProject = () => {
	const [loading, setLoading] = useState(true);
	const [found, setFound] = useState(true);
	const { projects, setProject } = useContext(UserContext);
	const router = useRouter();
	const { projectName } = router.query;

	useEffect(() => {
		const selectedProject = projects.find(
			(project) => createSlug(project?.name || '') === projectName
		);

		if (selectedProject) {
			setLoading(false);
			setProject(selectedProject);
			setFound(true);
		} else {
			setLoading(false);
			setFound(false);
		}
	}, [projectName, projects, setProject]);

	return { found, loading };
};
