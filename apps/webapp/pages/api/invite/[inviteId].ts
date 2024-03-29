import { createSlug } from './../../../utils/createSlug';
import { NextApiRequest, NextApiResponse } from 'next';
import initAuth0 from '../../../utils/auth0';
import { getUserId } from '../../../utils/user';
import { propagateInviteToDb } from '../../../utils/invite';

export default async function invite(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const auth0 = initAuth0(req);
	const session = await auth0.getSession(req);
	if (session?.user) {
		try {
			const userId = await getUserId(session.idToken);
			const response = await propagateInviteToDb(
				typeof req.query.inviteId === 'string'
					? req.query.inviteId
					: req.query.inviteId[0],
				userId
			);

			if (response.error) {
				return res.status(401).json({ invalidInvite: true });
			}

			const project = response.configurationUpdate?.project;
			const redirectTo = `/${createSlug(project?.name)}`;
			res.json({ redirectTo, project });
		} catch (error) {
			console.error(error);
			res.status(error.status || 500).end(error.message);
		}
	} else {
		res.json({ redirectTo: `/api/login?inviteId=${req.query.inviteId}` });
	}
}
