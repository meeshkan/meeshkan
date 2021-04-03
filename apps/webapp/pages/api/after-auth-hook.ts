import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '@utils/auth0';
import { confirmOrCreateUser } from '@utils/user';
import { createSlug } from '@utils/createSlug';
import { propagateInviteToDb } from '@utils/invite';

export default async function afterAuthHook(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	try {
		const auth0User = await getUser(req);
		const eightBaseUser = await confirmOrCreateUser(auth0User);
		const inviteId = req.query?.inviteId as string;
		if (inviteId) {
			const response = await propagateInviteToDb(inviteId, eightBaseUser.id);
			if (response.error) {
				res.redirect('/invite/invalid');
				return;
			} else {
				const redirectTo = createSlug(
					response.configurationUpdate?.project?.name
				);

				res.redirect(`/${redirectTo}`);
				return;
			}
		}

		res.redirect('/');
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
