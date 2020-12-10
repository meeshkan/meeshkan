import { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
import initAuth0, { getUser } from '../../../utils/auth0';
import { getUserId } from '../../../utils/user';
import { getProjects } from '../../../utils/project';
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
            ); // TODO: handle invalid link
			res.redirect(301, `/${slugify(
                response.configurationUpdate?.project?.name, { lower: true }
            )}`);
		} catch (error) {
			console.error(error);
			res.status(error.status || 500).end(error.message);
		}
	} else {
        res.redirect(301, `/api/login?inviteId=${req.query.inviteId}`);
    }
}
