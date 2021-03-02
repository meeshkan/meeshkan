import { Project } from './8base-schema';

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
