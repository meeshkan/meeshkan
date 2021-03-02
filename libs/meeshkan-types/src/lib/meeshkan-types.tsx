import { Project, TestRunListResponse, UserStory } from './8base-schema';

export type Avatar = {
	downloadUrl: string;
	shareUrl?: string;
};

export interface AvatarFile {
	fileId: string;
	filename: string;
}

export interface Commands {
	open?: {
		value: string;
	};
	setViewportSize?: {
		value: {
			xCoord: number;
			yCoord: number;
		};
	};
	click?: {
		target: {
			selector: {
				selector: string;
				tagName: string;
				innerText: string;
			};
		};
	};
	type?: {
		value: string;
		target: {
			selector: {
				tagName: string;
			};
		};
	};
	dragndrop?: {
		sourceTarget: {
			selector: {
				tagName: string;
				innerText: string;
			};
			coordinates: {
				xCoord: number;
				yCoord: number;
			};
		};
		destinationTarget: {
			selector: {
				tagName: string;
				innerText: string;
			};
			coordinates: {
				xCoord: number;
				yCoord: number;
			};
		};
	};
	sIndex?: number;
}

export interface DataPoint {
	title: string;
	score: number;
	maxPossible: number;
	timestamp: number;
	tag: DataPointTag;
}

export enum DataPointTag {
	TEST_RUN = 0,
	TEST_COVERAGE = 1,
}

export type UploadedFile = {
	id: string;
	fileId: string;
};

export interface Groups {
	gIndex: number;
	name: string;
	commands: {
		count?: number;
		items: Array<Commands>;
	};
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

interface Release {
	releaseDate: string;
	id: string;
	name: string;
	testRuns: TestRunListResponse;
}

export interface Releases {
	count: number;
	items: Array<Release>;
}

export interface UserStories {
	count: number;
	items: Array<UserStory>;
}
