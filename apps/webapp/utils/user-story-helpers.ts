import { Dispatch, SetStateAction } from 'react';
import {
	ScriptCommandListResponse,
	AuthenticationTokenListResponse,
	ScriptCommand,
	UserStories_ScriptCommandUpdateInput,
	UserStories_ScriptCommandCreateInput,
	UserStory,
} from './../../../libs/meeshkan-types/src/lib/8base-schema';
import { mutate } from 'swr';
import {
	DELETE_REJECTED_RECORDING,
	UPDATE_EXPECTED_TEST,
	UPDATE_REQUIRES_AUTHENTICATION,
	UPDATE_STORY_DESCRIPTION,
	UPDATE_STORY_SIGNIFICANCE,
	UPDATE_STORY_TITLE,
	UPDATE_STEP,
	UPDATE_MANY_STEPS,
	DELETE_SINGLE_COMMAND,
	CREATE_SINGLE_STEP,
} from '../graphql/user-story';
import { eightBaseClient } from './graphql';
import { eightBaseToPptr } from '@frontend/downloadable-script';
import { saveAs } from 'file-saver';

export const generateVideo = (
	startEventID: string,
	endEventID: string,
	userStoryID: string,
	setLoading: Dispatch<SetStateAction<boolean>>
) => {
	setLoading(true);

	fetch(
		process.env.NEXT_PUBLIC_MAKE_VIDEO_ENDPOINT ||
			'https://sfcyq4tmok.execute-api.eu-west-1.amazonaws.com/staging/make-video',
		{
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				startEventID,
				endEventID,
				userStoryID,
			}),
		}
	).then(() => setTimeout(() => setLoading(false), 30000));
};

export const updateTitle = (
	newTitle: string,
	userStoryId: string,
	idToken: string
) => {
	const client = eightBaseClient(idToken);

	client.request(UPDATE_STORY_TITLE, {
		userStoryId,
		newTitle: newTitle,
	});
};

export const updateDescription = (
	newDescription: string,
	userStoryId: string,
	idToken: string
) => {
	const client = eightBaseClient(idToken);
	client.request(UPDATE_STORY_DESCRIPTION, {
		userStoryId,
		newDescription: newDescription,
	});
};

export const updateSignificance = (
	newSignificance: string,
	userStoryId: string,
	idToken: string
) => {
	const client = eightBaseClient(idToken);
	client.request(UPDATE_STORY_SIGNIFICANCE, {
		userStoryId,
		newSignificance: newSignificance,
	});
};

export const updateRequiresAuthentication = (
	isAuthenticated: boolean,
	userStoryId: string,
	idToken: string
) => {
	const client = eightBaseClient(idToken);
	client.request(UPDATE_REQUIRES_AUTHENTICATION, {
		userStoryId: userStoryId,
		isAuthenticated,
	});
};

const updateExpectedTest = async (
	testCreatedDate: string,
	userStoryId: string,
	idToken: string
) => {
	const client = eightBaseClient(idToken);
	return client.request(UPDATE_EXPECTED_TEST, {
		userStoryId,
		testCreatedDate: testCreatedDate,
	});
};

type CreateTestCaseProps = {
	creatingTestCase: boolean;
	setCreatingTestCase: Dispatch<SetStateAction<boolean>>;
	slugifiedProjectName: string;
	date: string;
	userStoryId: string;
	idToken: string;
};

const deleteRejectedRecording = (userStoryId: string, idToken: string) => {
	const client = eightBaseClient(idToken);
	return client.request(DELETE_REJECTED_RECORDING, {
		userStoryId,
	});
};

type DeleteTestCaseProps = {
	deleting: boolean;
	setDeleting: Dispatch<SetStateAction<boolean>>;
	userStoryId: string;
	idToken: string;
};

export const onDelete = async ({
	deleting,
	setDeleting,
	userStoryId,
	idToken,
}: DeleteTestCaseProps) => {
	if (deleting) {
		return;
	}

	try {
		setDeleting(true);
		await deleteRejectedRecording(userStoryId, idToken);
		await mutate('/api/session');
		setDeleting(false);
	} catch (error) {
		console.error(error);
		return error;
	}
	return;
};

type DownloadProps = {
	scriptCommands: ScriptCommandListResponse;
	authenticationTokens: AuthenticationTokenListResponse['items'];
	stagingURL: string;
	slugifiedStoryName: string;
};

export const handleDownload = ({
	scriptCommands,
	authenticationTokens,
	stagingURL,
	slugifiedStoryName,
}: DownloadProps) => {
	try {
		const pptrScript = eightBaseToPptr(
			scriptCommands,
			{
				headless: true,
			},
			authenticationTokens,
			stagingURL
		);

		const blob = new Blob([pptrScript], {
			type: 'text/javascript;charset=utf-8',
		});
		saveAs(blob, `${slugifiedStoryName}.js`);
	} catch (error) {
		console.error(error);
		return 'error';
	}
	return;
};

export const updateStep = async (
	commandID: string,
	scriptCommand: ScriptCommand,
	idToken: string
) => {
	const client = eightBaseClient(idToken);

	const request = await client.request(UPDATE_STEP, {
		commandID,
		scriptCommand,
	});

	return request;
};

export const createStep = (
	id: string,
	create: UserStories_ScriptCommandCreateInput,
	idToken: string
): Promise<UserStory> => {
	const client = eightBaseClient(idToken);

	return client
		.request(CREATE_SINGLE_STEP, {
			id,
			create,
		})
		.then(({ userStoryUpdate }) => userStoryUpdate);
};

export const updateManySteps = (
	id: string,
	updates: UserStories_ScriptCommandUpdateInput[],
	idToken: string
) => {
	const client = eightBaseClient(idToken);

	client.request(UPDATE_MANY_STEPS, {
		id,
		updates,
	});
};

export const deleteSingleCommand = (id: string, idToken: string) => {
	const client = eightBaseClient(idToken);

	client.request(DELETE_SINGLE_COMMAND, {
		id,
	});
};
