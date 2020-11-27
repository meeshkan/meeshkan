import { initAuth0 } from '@auth0/nextjs-auth0';
import { ISignInWithAuth0 } from '@auth0/nextjs-auth0/dist/instance';
import { IncomingMessage } from 'http';
import ms from 'ms';
import { IUser } from './user';

const cookieLifetime = ms('30 days') / 1000;
const httpTimeout = ms('10s');
const scope = 'openid profile email id_token';

const createAuth0 = (origin: string): ISignInWithAuth0 => {
	return initAuth0({
		clientId: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		scope,
		domain: process.env.AUTH0_DOMAIN,
		redirectUri: `${origin}/api/callback`,
		postLogoutRedirectUri: origin,
		session: {
			cookieSecret: process.env.SESSION_COOKIE_SECRET,
			cookieLifetime,
			storeIdToken: true,
		},
		oidcClient: {
			httpTimeout,
		},
	});
};

const initAuth0WithReq = (req: IncomingMessage): ISignInWithAuth0 => {
	const host = req.headers.host;
	const protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';
	const origin = `${protocol}//${host}`;
	return createAuth0(origin);
};

export const getUser = async (req: IncomingMessage): Promise<IUser> => {
	const auth0 = initAuth0WithReq(req);
	const session = await auth0.getSession(req);
	if (!session) {
		throw new Error('User session does not exist. User must be logged in.');
	}

	const { email, name, picture, nickname } = session.user;
	const user = {
		email: email ? email : name,
		name: email ? name : undefined,
		avatar: picture,
		nickname,
		idToken: session.idToken,
	};

	return user;
};

export default initAuth0WithReq;
