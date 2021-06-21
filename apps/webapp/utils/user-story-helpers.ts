import {
	ScriptCommandListResponse,
	AuthenticationTokenListResponse,
} from './../../../libs/meeshkan-types/src/lib/8base-schema';
import React, { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import {
	DELETE_REJECTED_RECORDING,
	UPDATE_EXPECTED_TEST,
	UPDATE_REQUIRES_AUTHENTICATION,
	UPDATE_STORY_DESCRIPTION,
	UPDATE_STORY_SIGNIFICANCE,
	UPDATE_STORY_TITLE,
} from '../graphql/user-story';
import { useToaster } from '../hooks/use-toaster';
import { eightBaseClient } from './graphql';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';
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

export const onCreateTestCase = async ({
	creatingTestCase,
	setCreatingTestCase,
	slugifiedProjectName,
	date,
	userStoryId,
	idToken,
}: CreateTestCaseProps) => {
	const toaster = useToaster();
	const router = useRouter();
	const mixpanel = useAnalytics();

	if (creatingTestCase) {
		return;
	}

	setCreatingTestCase(true);
	mixpanel.track('Create a test case');
	const toasterId = 'creatingTestCase';
	toaster({
		status: 'info',
		title: 'Creating test case...',
		id: toasterId,
	});

	await updateExpectedTest(date, userStoryId, idToken);
	await mutate('/api/session');
	toaster.close(toasterId);
	toaster({
		status: 'success',
		title: 'A test case was created!',
		description:
			'The user story has been marked as a test case. It can now be found in the test cases tab.',
	});

	router.push(`/${slugifiedProjectName}/user-stories`);
	setCreatingTestCase(false);
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
	slugifiedProjectName: string;
	userStoryId: string;
	idToken: string;
};

export const onDelete = async ({
	deleting,
	setDeleting,
	slugifiedProjectName,
	userStoryId,
	idToken,
}: DeleteTestCaseProps) => {
	const toaster = useToaster();
	const router = useRouter();
	const mixpanel = useAnalytics();

	if (deleting) {
		return;
	}

	setDeleting(true);
	mixpanel.track('Delete a user story');
	const toasterId = 'deleting';
	toaster({
		status: 'info',
		title: 'Deleting this user story...',
		id: toasterId,
	});

	await deleteRejectedRecording(userStoryId, idToken);
	await mutate('/api/session');
	toaster.close(toasterId);
	toaster({
		status: 'success',
		title: 'A recording has been rejected.',
		description:
			'Rejecting a recording will delete the series of steps as a user story.',
	});

	router.push(`/${slugifiedProjectName}/user-stories`);
	setDeleting(false);
};

export const handleDownload = (
	scriptCommands: ScriptCommandListResponse,
	authenticationTokens: AuthenticationTokenListResponse['items'],
	stagingURL: string,
	slugifiedStoryName: string
) => {
	const toaster = useToaster();
	const mixpanel = useAnalytics();
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
	} catch (err) {
		toaster({
			status: 'error',
			title: 'Your test case could not be generated.',
			description: 'Please try again in a few seconds.',
		});
	}
	mixpanel.track('Puppeteer script downloaded');
};
