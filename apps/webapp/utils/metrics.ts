import _ from 'lodash';
import moment from 'moment';
import { UserStories, Project } from './user';

const daysUntilDate = (date: moment.Moment): number =>
	date.diff(moment(), 'days');

export const getTestRuns = (userStories: UserStories) => {
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

export const getBugs = (userStories: UserStories) => {
	const introduced = _.sumBy(userStories, 'failing.count');
	const fixed = _.sumBy(userStories, (story) => {
		const failingItems = story?.failing.items;
		return _.sumBy(failingItems, (item) => Number(item.isResolved));
	});
	return {
		introduced,
		fixed,
	}
};

export const getTestCoverage = (userStories: UserStories) => {
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
	}
};

export const getLatestTestStates = (userStories: UserStories) => {
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

const lastSevenDays = [...Array(7).keys()].map((i) =>
	moment().subtract(i + 1, 'days')
);

export const getRecordingsAndTestsByDay = (userStories: UserStories) => {
	const recordingsByDay = {};
	const testsByDay = {};
	lastSevenDays.forEach((day) => {
		const userStoriesOnThisDay = userStories.filter((story) => {
			const { testCreatedDate } = story;
			return testCreatedDate
				? moment(testCreatedDate).isSame(day, 'day')
				: false;
		});
		const dayValue = day.valueOf();
		recordingsByDay[dayValue] = userStoriesOnThisDay.length;
		testsByDay[dayValue] = _.sumBy(userStoriesOnThisDay, (item) =>
			Number(item.isTestCase)
		);
	});
	return {
		recordingsByDay,
		testsByDay,
	}
};

export const sumOfObjectArrayValues = (
	array: Array<{ [key: string]: number }>
) => _.sum(_.values(array));

export const getLastSevenDaysInFormat = (format: string) =>
	lastSevenDays.map((day) => day.format(format));	
