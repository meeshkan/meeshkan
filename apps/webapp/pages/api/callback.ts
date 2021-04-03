import { NextApiRequest, NextApiResponse } from 'next';
import { ISession } from '@auth0/nextjs-auth0/dist/session/session';
import initAuth0 from '@utils/auth0';

export default async function callback(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	try {
		const auth0 = initAuth0(req);
		await auth0.handleCallback(req, res, {
			onUserLoaded: async (
				_: NextApiRequest,
				__: NextApiResponse,
				session: ISession,
				state: { inviteId?: string }
			) => {
				const redirectParams = new URLSearchParams();
				if (state.inviteId) {
					redirectParams.append('inviteId', state.inviteId);
				}

				return {
					session,
					options: {
						redirectTo: `/api/after-auth-hook?${redirectParams}`,
					},
				};
			},
		});
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
