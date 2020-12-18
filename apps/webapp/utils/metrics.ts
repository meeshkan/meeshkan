import _ from 'lodash';
import moment from 'moment';
import { UserStories, Project } from './user';

import {
	createConfidenceScore,
	ConfidenceFactors,
	TestPriority,
	TestStatus,
} from '@frontend/confidence-score';

const daysUntilDate = (date: moment.Moment): number =>
	date.diff(moment(), 'days');

export const getTestRuns = (userStories: UserStories['items']) => {
	const testRunsTotal = _.sumBy(userStories, 'testRuns.count');
	const pastTestRunsTotal = 0;
	return {
		value: testRunsTotal,
		percentageChange:
			testRunsTotal > 0 ? (pastTestRunsTotal / testRunsTotal) * 100 : 0,
		dataPoints: pastTestRunsTotal,
	};
};

export const getDaysUntilRelease = (project: Project) => {
	const [release] = project.release.items;
	const releaseDate = release?.releaseDate;
	return releaseDate ? daysUntilDate(moment(releaseDate)) : null;
};

export const getBugs = (userStories: UserStories['items']) => {
	const introduced = _.sumBy(userStories, 'failing.count');
	const fixed = _.sumBy(userStories, (story) => {
		const failingItems = story?.failing.items;
		return _.sumBy(failingItems, (item) => Number(item.isResolved));
	});
	return {
		introduced,
		fixed,
	};
};

type DisplayableMetric = {
	value: number;
	percentageChange: number;
	dataPoints: number;
};

export const getTestCoverage = (
	userStories: UserStories['items']
): DisplayableMetric => {
	const numberOfTests = _.sumBy(userStories, (item) =>
		item?.isTestCase ? 1 : 0
	);
	const numberOfRecordings = userStories.length;
	const testCoverageValue =
		numberOfRecordings !== 0 ? (numberOfTests / numberOfRecordings) * 100 : 0;
	const pastTestCoverageValue = 0;
	return {
		value: testCoverageValue,
		percentageChange:
			testCoverageValue > 0
				? (pastTestCoverageValue / testCoverageValue) * 100
				: 0,
		dataPoints: numberOfRecordings,
	};
};

export const getLatestTestStates = (userStories: UserStories['items']) => {
	const latestTestStates: { [key: string]: number } = {};
	userStories?.forEach((story) => {
		const [latestTestRun] = story.testRuns.items
			.sort(
				(a, b) =>
					new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
			)
			.slice(-1);

		const status = latestTestRun?.status;
		if (status) {
			latestTestStates[status]++;
		}
	});
	return latestTestStates;
};

const lastSevenDays = [...Array(7).keys()]
	.map((i) => moment().subtract(i + 1, 'days'))
	.reverse();

export const getRecordingsAndTestsByDay = (
	userStories: UserStories['items']
) => {
	const recordingsByDay = {};
	const testsByDay = {};
	lastSevenDays.forEach((day) => {
		const recordingsOnThisDay = userStories.filter((story) => {
			const { createdAt, isTestCase } = story;
			return moment(createdAt).isSame(day, 'day') && !isTestCase;
		});
		const testsOnThisDay = userStories.filter((story) => {
			const { testCreatedDate, isTestCase } = story;
			return testCreatedDate
				? moment(testCreatedDate).isSame(day, 'day') && isTestCase
				: false;
		});
		const dayValue = day.valueOf();
		recordingsByDay[dayValue] = recordingsOnThisDay.length;
		testsByDay[dayValue] = testsOnThisDay.length;
	});
	return {
		recordingsByDay,
		testsByDay,
	};
};

export const sumOfObjectValues = (object: { [key: string]: number }) =>
	_.sum(_.values(object));

export const getLastSevenDaysInFormat = (format: string) =>
	lastSevenDays.map((day) => day.format(format));

export const getConfidenceScore = (
	userStories: UserStories['items']
): DisplayableMetric => {
	const confidenceFactors: ConfidenceFactors = {
		mainBranch: {
			name: 'main',
			totalRecordings: userStories.length,
			totalIsTestCase: userStories.filter((story) => story.isTestCase).length,
			testRuns: userStories
				.filter((story) => story.isTestCase)
				.map((story) =>
					story.testRuns.items
						.filter(
							(testRun) =>
								testRun.status !== 'queued' && testRun.status !== 'running'
						)
						.map((testRun) => ({
							status:
								testRun.status === 'failing'
									? TestStatus.FAILING
									: testRun.status === 'passing'
									? TestStatus.PASSING
									: TestStatus.DID_NOT_RUN,
							// TODO: add more meaningful priority
							priority: TestPriority.LOW,
							// TODO: change to updatedAt
							timestampUTC: new Date(testRun.dateTime).getTime(),
						}))
				)
				.reduce((a, b) => [...a, ...b]),
		},
		// for now, there is no information regarding other branches
		otherBranches: [],
	};
	return {
		value: createConfidenceScore(confidenceFactors) * 100,
		percentageChange: 0.0, // TODO: un-hard-code when we have a meaningful sense of window
		dataPoints: userStories.length,
	};
};
