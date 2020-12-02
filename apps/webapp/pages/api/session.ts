import { NextApiRequest, NextApiResponse } from 'next';
import initAuth0, { getUser } from '../../utils/auth0';
import { getUserAvatar } from '../../utils/user';
import { getProjects } from '../../utils/project';

export default function session(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const auth0 = initAuth0(req);
	return auth0.requireAuthentication(async (req, res) => {
		try {
			const user = await getUser(req);
			user.avatar = await getUserAvatar(user.idToken);
			user.projects = await getProjects(user.idToken);
			res.json(user);
		} catch (error) {
			console.error(error);
			res.status(error.status || 500).end(error.message);
		}
	})(req, res);
}
