import { IUser, Project } from '@frontend/meeshkan-types';
import { IUserContext } from '../utils/user';

const extensionId = 'cfjdddhjecoeahjkmegbkakfpppflmgo';

export interface IProject {
	id: string;
	name: string;
	avatar: string;
}

export interface IAuth {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	project: IProject | null;
	projects?: Array<IProject>;
}

export const latestVersion = '0.4.4';

export const isChrome = (): boolean => !!window.chrome;

export const startRecording = ({
	url,
	clientId,
	isAuthFlow = false,
}: {
	url: string;
	clientId: string;
	isAuthFlow: boolean;
}) => {
	window.chrome.runtime.sendMessage(extensionId, {
		message: 'startRecording',
		url,
		clientId,
		isAuthFlow,
	});
};

export const getVersion = () => {
	return new Promise((resolve, reject) => {
		window.chrome.runtime.sendMessage(
			extensionId,
			{ message: 'version' },
			(reply: { version: number } | null) => {
				if (reply?.version) {
					resolve(reply.version);
				} else {
					reject();
				}
			}
		);
	});
};

export const handleExtensionAuthHandshake = (
	event: Event,
	user: IUserContext
): void => {
	const parseProject = (project: Project) => {
		return {
			id: project.id,
			name: project.name,
			avatar: project.avatar?.downloadUrl,
		};
	};

	const project = user.project;
	const extensionUser: IAuth = {
		id: user.id,
		email: user.email,
		name: user.name,
		avatar: user.avatar,
		projects: user.projects.map(parseProject),
		project: project
			? parseProject(project)
			: user.projects.length > 0
				? parseProject(user.projects[0])
				: null,
	};

	window.chrome.runtime.sendMessage(extensionId, {
		message: 'authenticateUser',
		user: extensionUser,
	});

	window.close();
};
