import { NextApiRequest, NextApiResponse } from 'next';
import initAuth0, { getUser } from '../../utils/auth0';

export default function session(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const auth0 = initAuth0(req);
	return auth0.requireAuthentication(async (req, res) => {
		try {
			const user = await getUser(req);
			res.json(user);
		} catch (error) {
			console.error(error);
			res.status(error.status || 500).end(error.message);
		}
	})(req, res);
}
