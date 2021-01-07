import { createContext } from 'react';
import { responseInterface } from 'swr';
import {
	CURRENT_USER,
	SIGN_UP_USER,
	UPDATE_USER,
	UPDATE_AVATAR,
	USER_AVATAR,
	USER_PROFILE,
	UPDATE_PRODUCT_NOTIFICATIONS,
} from '../graphql/user';
import { eightBaseClient } from './graphql';
import { uploadFileFromUrl } from './8base';
import { Intercom } from './intercom';

type Avatar = {
	downloadUrl: string;
	shareUrl?: string;
};

export interface AvatarFile {
	fileId: string;
	filename: string;
}

interface Configuration {
	inviteLink: string;
}

interface TestRun {
	status: string;
	dateTime: string;
	userStories: {
		items: Array<{ id: string }>;
	};
}

interface TestRuns {
	count: number;
	items: Array<TestRun>;
}

interface UserStoryFailing {
	count: number;
	items: Array<{
		firstIntroduction: string;
		isResolved: boolean;
	}>;
}

export interface UserStory {
	id: string;
	failing: UserStoryFailing;
	title: string;
	isTestCase: boolean;
	createdAt: string;
	significance: 'low' | 'medium' | 'high';
	testCreatedDate: string;
	testRuns: TestRuns;
}

export interface UserStories {
	count: number;
	items: Array<UserStory>;
}

interface Release {
	count: number;
	items: Array<{ releaseDate: string }>;
}

export interface Member {
	firstName: string;
	lastName: string;
	avatar: Avatar;
	email: string;
}

interface Members {
	count: number;
	items: Array<Member>;
}

export interface Project {
	id: string;
	name: string;
	avatar: Avatar;
	configuration: Configuration;
	hasReceivedEvents: boolean;
	members: Members;
	userStories: UserStories;
	release?: Release;
}

export interface IUser {
	id?: string;
	email: string;
	firstName?: string;
	lastName?: string;
	name?: string;
	avatar: string;
	nickname: string;
	idToken?: string;
	jobTitle?: string;
	productNotifications?: boolean;
	error?: string;
	projects?: Array<Project>;
}

declare global {
	interface Window {
		__user?: IUser;
		Intercom?: Intercom;
	}
}

type IUserContext =
	| (IUser & {
			project: Project;
			setProject: (project: Project) => void;
			mutate: responseInterface<void | IUser, any>['mutate'];
	  })
	| null;

export const UserContext = createContext<IUserContext>(null);

export const goToLogin = () => {
	const redirectTo = encodeURIComponent(
		window.location.pathname + window.location.search
	);
	const loginHref = `/api/login?redirectTo=${redirectTo}`;
	window.location.href = loginHref;
};

export const getUserId = async (idToken: string) => {
	const client = eightBaseClient(idToken);
	const data = await client.request(CURRENT_USER);
	return data.user.id;
};

const splitName = (name: string): { firstName: string; lastName: string } => {
	const nameArray = name.split(' ');
	const firstName = nameArray.slice(0, -1).join(' ');
	const lastName = nameArray.slice(-1).join(' ');
	return {
		firstName,
		lastName,
	};
};

const uploadAvatar = async (idToken: string, avatar: string) => {
	const { filename, url } = await uploadFileFromUrl(idToken, avatar);
	const fileId = url.split('/').slice(-1)[0];
	return {
		fileId,
		filename,
	};
};

export const confirmOrCreateUser = async (user: IUser) => {
	const client = eightBaseClient(user.idToken);
	await client.request(CURRENT_USER).catch(async () => {
		const { userSignUpWithToken } = await client.request(SIGN_UP_USER, {
			user: {
				email: user.email,
			},
			authProfileId: process.env.EIGHT_BASE_AUTH_PROFILE_ID,
		});
		const { firstName, lastName } = splitName(user.name);
		const { fileId, filename } = await uploadAvatar(user.idToken, user.avatar);
		await client.request(UPDATE_USER, {
			id: userSignUpWithToken.id,
			user: {
				firstName,
				lastName,
				avatar: {
					create: {
						fileId,
						filename,
					},
				},
			},
		});
	});
};

export const updateProfile = async (
	idToken: string,
	data: { name: string; jobTitle: string }
) => {
	const client = eightBaseClient(idToken);
	const id = await getUserId(idToken);
	const { firstName, lastName } = splitName(data.name);

	let result;
	try {
		result = await client.request(UPDATE_USER, {
			id,
			user: {
				firstName,
				lastName,
				jobTitle: data.jobTitle,
			},
		});
	} catch (error) {
		result = {
			error: error.response.errors[0],
		};
	}

	return result;
};

export const updateAvatar = async (
	idToken: string,
	data: { fileId: string; filename: string }
) => {
	const client = eightBaseClient(idToken);
	const id = await getUserId(idToken);

	let result;
	try {
		result = await client.request(UPDATE_AVATAR, {
			id,
			fileId: data.fileId,
			filename: data.filename,
		});
	} catch (error) {
		result = {
			error: error.response.errors[0],
		};
	}

	return result;
};

export const getUserAvatar = async (idToken: string) => {
	const client = eightBaseClient(idToken);
	try {
		const data = await client.request(USER_AVATAR);
		return data.user.avatar?.downloadUrl || '';
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const getUserProfile = async (idToken: string) => {
	const client = eightBaseClient(idToken);
	try {
		const data = await client.request(USER_PROFILE);
		return data.user;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const updateProductNotifications = async (
	idToken: string,
	data: { productNotifications: boolean }
) => {
	const client = eightBaseClient(idToken);
	const id = await getUserId(idToken);

	let result;
	try {
		result = await client.request(UPDATE_PRODUCT_NOTIFICATIONS, {
			id,
			productNotifications: data.productNotifications,
		});
	} catch (error) {
		result = {
			error: error.response.errors[0],
		};
	}

	return result;
};
