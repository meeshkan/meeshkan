import get from 'lodash/get';
import { NextApiRequest, NextApiResponse } from 'next';
import initAuth0 from '../../utils/auth0';

export default async function login(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	try {
		const auth0 = initAuth0(req);
		const session = await auth0.getSession(req);
		await auth0.handleLogin(req, res, {
			authParams: {
				login_hint: get(session, 'user.name'),
			},
			getState: (req) => (req.query.inviteId ? { inviteId: req.query.inviteId } : {}),
		});
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
