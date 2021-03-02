export interface AuthenticationToken {
	id: string;
	type: 'local storage' | 'cookie';
	key: string;
	value: string;
}

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

export interface Configuration {
	inviteLink: string;
	productionURL: string;
	stagingURL: string;
	authenticationTokens: {
		items: Array<AuthenticationToken>;
	};
	logInFlow?: UserStory;
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

export interface Project {
	id: string;
	name: string;
	avatar: Avatar;
	configuration: Configuration;
	hasReceivedEvents: boolean;
	members: Members;
	userStories: UserStories;
	release: Releases;
}

export interface Recording {
	id: string;
	video?: {
		downloadUrl: string;
	};
	startEventId: string;
	endEventId: string;
	environment: {
		items: [
			{
				ipAddress: string;
				browser: string;
				browserVersion: string;
				operatingSystem: string;
				language: string;
			}
		];
	};
	seleniumScript: SeleniumScript;
}

interface Release {
	releaseDate: string;
	id: string;
	name: string;
	testRuns: TestRuns;
}

export interface Releases {
	count: number;
	items: Array<Release>;
}

export interface SeleniumScript {
	version?: string;
	groups: {
		groupsCount?: number;
		groupItems: Array<Groups>;
	};
}

export interface TestOutcome {
	status: 'queued' | 'in progress' | 'did not run' | 'failing' | 'passing';
	isResolved: boolean;
	errorDetails?: {
		stepIndex: number;
		exception: string;
	};
	createdAt: string;
	userStory: UserStory;
	video?: {
		downloadUrl: string;
		shareUrl?: string;
	};
}

interface TestOutcomes {
	count: number;
	items: Array<TestOutcome>;
}

export interface TestRun {
	id: string;
	status: 'queued' | 'running' | 'runError' | 'completed';
	createdAt: string;
	testLength: string;
	ciRun: string;
	testOutcome: TestOutcomes;
}

export interface TestRuns {
	count: number;
	items: Array<TestRun>;
}

export interface UserStories {
	count: number;
	items: Array<UserStory>;
}
export interface UserStory {
	createdAt: string;
	id: string;
	title: string;
	isTestCase: boolean;
	testCreatedDate: string;
	flowIDs: [number];
	created: 'user' | 'manual';
	isExpected: boolean;
	significance: 'low' | 'medium' | 'high';
	recording: Recording;
	testOutcome?: TestOutcomes;
	isAuthenticated: boolean;
}
