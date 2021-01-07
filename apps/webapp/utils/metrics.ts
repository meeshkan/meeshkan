import _ from 'lodash';
import moment from 'moment';
import { UserStories, Project, UserStory } from './user';

export enum DataPointTag {
	TEST_RUN = 0,
	TEST_COVERAGE = 1,
}

export interface DataPoint {
	title: string;
	score: number;
	maxPossible: number;
	timestamp: number;
	tag: DataPointTag;
}

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

export const COVERAGE_DATA_POINT = 'COVERAGE_DATA_POINT';
export const MAX_POSSIBLE_TEST_COVERAGE_SCORE = 30;
export const MAX_POSSIBLE_TEST_RUN_SCORE = 70;
const MS_IN_14_DAYS = 1209600000;
const storySignificance = (story: UserStory): number => 10.0;

export const getConfidenceScore = (
	howLongAgo: number,
	releaseStarted: number,
	userStories_: UserStories['items']
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
				const testRunScoreComponents = story.testRuns.items
					.filter((run) => new Date(run.dateTime).getTime() < howLongAgo)
					.map((run) => {
						const runTime = new Date(run.dateTime).getTime();
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
