import { NextApiRequest, NextApiResponse } from 'next';
import initAuth0 from '../../utils/auth0';

export default async function logout(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	try {
		const auth0 = initAuth0(req);
		await auth0.handleLogout(req, res);
		await window.CommandBar.shutdown();
	} catch (error) {
		console.error(error);
		res.status(error.status || 500).end(error.message);
	}
}
