import { NextApiRequest, NextApiResponse } from 'next';
import initAuth0 from '../../utils/auth0';
import { getUserId } from '../../utils/user';
import { propagateInviteToDb } from '../../utils/invite';

export default async function callback(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	try {
		const auth0 = initAuth0(req);
		await auth0.handleCallback(req, res, {
			redirectTo: '/api/after-auth-hook',
			onUserLoaded: async (_, __, session, state) => {
				if (state.inviteId) {
					const userId = await getUserId(session.idToken);
					const response = await propagateInviteToDb(state.inviteId, userId);
				}

				return session;
			}
		});
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
