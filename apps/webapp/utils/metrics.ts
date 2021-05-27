import _ from 'lodash';
import { daysUntilDate, lastNDays, isSameDay } from './date';
import {
	UserStoryListResponse,
	Project,
	UserStory,
	TestRunListResponse,
	ReleaseListResponse,
	DataPoint,
	DataPointTag,
} from '@frontend/meeshkan-types';

export const getTestRuns = (releases: ReleaseListResponse['items']) => {
	const testRunsTotal = releases.reduce(
		(a, b) => ({
			testRuns: {
				count: a.testRuns.count + b.testRuns.count,
			},
		}),
		{
			testRuns: { count: 0 },
		}
	).testRuns.count;

	const pastTestRunsTotal = 0;
	return {
		value: testRunsTotal,
		percentageChange:
			testRunsTotal > 0
				? ((pastTestRunsTotal + testRunsTotal) / testRunsTotal) * 100
				: 0,
		dataPoints: pastTestRunsTotal,
	};
};

export const getDaysUntilRelease = (project: Project) => {
	const [release] = project.release.items;
	const releaseDate = release.releaseDate;
	return releaseDate ? daysUntilDate(new Date(releaseDate)) : null;
};

export const getBugs = (testRuns: TestRunListResponse['items']) => {
	const introduced = _.sumBy(testRuns, (testRun) => {
		const testOutcomes = testRun?.testOutcome?.items;
		return _.sumBy(testOutcomes, (item) => Number(item.status === 'failing'));
	});

	// const fixed = _.sumBy(userStories, (story) => {
	// 	const failingItems = story?.failing.items;
	// 	return _.sumBy(failingItems, (item) => Number(item.isResolved));
	// });

	return {
		introduced,
		// fixed,
	};
};

export const getLatestTestStates = (testRuns: TestRunListResponse['items']) => {
	const latestTestStates: Record<string, number> = {
		failing: 0,
		passing: 0,
		'did not run': 0,
	};

	testRuns?.forEach((testRun) => {
		const [latestTestOutcome] = testRun.testOutcome.items
			.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			)
			.slice(-1);

		const status: string = latestTestOutcome?.status;
		if (status) {
			latestTestStates[status]++;
		}
	});

	return latestTestStates;
};

export const getRecordingsAndTestsByDay = (
	days: number,
	userStories: UserStoryListResponse['items']
) => {
	const recordingsByDay: Record<string, number> = {};
	const testsByDay: Record<string, number> = {};
	lastNDays(days).forEach((day) => {
		const recordingsOnThisDay = userStories.filter((story) => {
			const { createdAt, isTestCase } = story;
			return isSameDay(new Date(createdAt), day) && !isTestCase;
		});
		const testsOnThisDay = userStories.filter((story) => {
			const { testCreatedDate, isTestCase } = story;
			return testCreatedDate
				? isSameDay(new Date(testCreatedDate), day) && isTestCase
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

// TODO: fill me in with correct info once we can determine
// the release start date. For now, set arbitrarily to 30 days.
export const getReleaseStartFromProject = (project: Project) =>
	new Date().getTime() - 1000 * 60 * 60 * 24 * 30;

export const calculatePercentageChange = (
	key: string,
	confidenceScoreNDaysAgo: Record<string, DataPoint>,
	dataPoint: DataPoint
) =>
	confidenceScoreNDaysAgo[key]
		? dataPoint.score - confidenceScoreNDaysAgo[key].score
		: dataPoint.score;

export const deltaChange = (oldValue: number, newValue: number) =>
	oldValue === 0 ? (newValue === 0 ? 0 : 100) : ((oldValue - newValue) * 100) / oldValue;

export const COVERAGE_DATA_POINT = 'COVERAGE_DATA_POINT';
export const MAX_POSSIBLE_TEST_COVERAGE_SCORE = 30;
export const MAX_POSSIBLE_TEST_RUN_SCORE = 70;
const MS_IN_14_DAYS = 1209600000;
const storySignificance = (story: UserStory): number => 10.0;

export const getConfidenceScore = (
	howLongAgo: number,
	releaseStarted: number,
	userStories_: UserStoryListResponse['items']
): Record<string, DataPoint> => {
	const userStories = userStories_.filter(
		(story) => new Date(story.createdAt).getTime() < howLongAgo
	);
	const totalSignificance = userStories
		.map((story) => storySignificance(story))
		.reduce((a, b) => a + b, 0);
	const dataPoints: Record<string, DataPoint> = {
		...userStories
			.map((story) => ({
				[story.id + COVERAGE_DATA_POINT]: {
					score:
						((story.isTestCase &&
						typeof story.testCreatedDate === 'string' &&
						new Date(story.testCreatedDate).getTime() <= howLongAgo
							? 1
							: 0) *
							MAX_POSSIBLE_TEST_COVERAGE_SCORE) /
						userStories.length,
					tag: DataPointTag.TEST_COVERAGE,
					title: 'Test coverage for ' + story.title,
					timestamp: new Date(story.createdAt).getTime(),
					maxPossible: MAX_POSSIBLE_TEST_COVERAGE_SCORE / userStories.length,
				},
			}))
			.reduce((a, b) => ({ ...a, ...b }), {}),

		...userStories
			.map((story) => {
				const significance = storySignificance(story);
				const testRunScoreComponents = story.testOutcome.items
					.filter((run) => new Date(run.createdAt).getTime() < howLongAgo)
					.map((run) => {
						const runTime = new Date(run.createdAt).getTime();
						return {
							maxPossible:
								runTime < howLongAgo - MS_IN_14_DAYS
									? 0
									: ((MS_IN_14_DAYS - (howLongAgo - runTime)) / MS_IN_14_DAYS) *
									  (runTime >= releaseStarted ? 1.0 : 0.5),
							status: run.status,
						};
					});
				const maxPossibleTestRunScore = testRunScoreComponents
					.map((a) => a.maxPossible)
					.reduce((a, b) => a + b, 0);
				const actualTestRunScore = testRunScoreComponents
					.map(
						(a) =>
							a.maxPossible *
							(a.status === 'failing'
								? 0.0
								: a.status === 'passing'
								? 1.0
								: 0.5)
					)
					.reduce((a, b) => a + b, 0);
				const maxPossible =
					totalSignificance === 0
						? 0
						: (significance * MAX_POSSIBLE_TEST_RUN_SCORE) / totalSignificance;
				return {
					[story.id]: {
						title: story.title,
						timestamp: new Date(story.createdAt).getTime(),
						tag: DataPointTag.TEST_RUN,
						score:
							maxPossibleTestRunScore === 0
								? 0
								: (maxPossible * actualTestRunScore) / maxPossibleTestRunScore,
						maxPossible,
					},
				};
			})
			.reduce((a, b) => ({ ...a, ...b }), {}),
	};

	return dataPoints;
};
