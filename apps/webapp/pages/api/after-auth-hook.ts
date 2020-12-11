import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '../../utils/auth0';
import { confirmOrCreateUser } from '../../utils/user';

export default async function afterAuthHook(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	try {
		const user = await getUser(req);
		await confirmOrCreateUser(user);
		res.redirect(
			`/${req.query?.invalidInvite ? 'invite/invalid' : req.query?.redirectTo}`
		);
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
