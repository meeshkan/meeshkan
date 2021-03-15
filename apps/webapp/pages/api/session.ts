import { NextApiRequest, NextApiResponse } from 'next';
import initAuth0, { getUser as getAuth0User } from '../../utils/auth0';
import { getUser as getEightBaseUser } from '../../utils/user';

export default function session(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const auth0 = initAuth0(req);
	return auth0.requireAuthentication(
		async (req: NextApiRequest, res: NextApiResponse) => {
			try {
				const auth0User = await getAuth0User(req);
				const eightBaseUser = await getEightBaseUser(auth0User.idToken);
				eightBaseUser.avatar = eightBaseUser.avatar?.downloadUrl;
				eightBaseUser.projects = eightBaseUser.projects.items;
				res.json({
					...auth0User,
					...eightBaseUser,
					name:
						eightBaseUser.firstName && eightBaseUser.lastName
							? `${eightBaseUser.firstName} ${eightBaseUser.lastName}`
							: undefined,
				});
			} catch (error) {
				console.error(error);
				res.status(error.status || 500).end(error.message);
			}
		}
	)(req, res);
}
