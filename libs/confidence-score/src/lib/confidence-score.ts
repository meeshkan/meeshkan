export enum TestStatus {
	PASSING = 0,
	FAILING = 1,
	DID_NOT_RUN = 2,
}
export enum TestPriority {
	LOW = 0,
	WARNING = 1,
	BLOCKING = 2,
}
enum TestRunConfidence {
	LOW = 0,
	MEDIUM = 1,
	HIGH = 2,
}
type TestRunConfidencePercentanges = {
	low: number;
	medium: number;
	high: number;
};
export type TestRun = {
	parentStoryTitle: string;
	status: TestStatus;
	priority: TestPriority;
	timestampUTC: number;
};
export type TestRunWithConfidence = {
	parentStoryTitle: string;
	status: TestStatus;
	priority: TestPriority;
	timestampUTC: number;
	confidence: TestRunConfidence;
};

export type Branch = {
	name: string;
	testRuns: Array<TestRun>;
	totalIsTestCase: number;
	totalRecordings: number;
};
export type ConfidenceFactors = {
	mainBranch: Branch;
	otherBranches: Array<Branch>;
};
type MainPlusOtherBranches = [Branch, ...Branch[]];

const testStatusAndPriorityToTestRunConfidence = (
	testStatus: TestStatus,
	testPriority: TestPriority
): TestRunConfidence =>
	testPriority === TestPriority.BLOCKING && testStatus === TestStatus.FAILING
		? TestRunConfidence.LOW // make worse than this somehow
		: testPriority === TestPriority.BLOCKING &&
		  testStatus === TestStatus.DID_NOT_RUN
		? TestRunConfidence.LOW
		: testPriority === TestPriority.WARNING &&
		  testStatus === TestStatus.DID_NOT_RUN
		? TestRunConfidence.MEDIUM
		: testPriority === TestPriority.BLOCKING &&
		  testStatus === TestStatus.DID_NOT_RUN
		? TestRunConfidence.LOW
		: testPriority === TestPriority.LOW && testStatus === TestStatus.DID_NOT_RUN
		? TestRunConfidence.MEDIUM
		: testPriority === TestPriority.LOW && testStatus === TestStatus.FAILING
		? TestRunConfidence.MEDIUM
		: TestRunConfidence.HIGH;

const testRunConfidenceScoresToTestRunConfidencePercentage = (
	confidenceLevel: TestRunConfidence,
	testRunConfidences: Array<TestRunConfidence>
): number =>
	testRunConfidences.filter(
		(testRunConfidence) => testRunConfidence === confidenceLevel
	).length / testRunConfidences.length;

const maxTestRunConfidencePercentagesDiff = 2.0;
const testRunConfidencePercentagesDiff = (
	testRunConfidencePercentanges0: TestRunConfidencePercentanges,
	testRunConfidencePercentanges1: TestRunConfidencePercentanges
): number =>
	Math.abs(
		testRunConfidencePercentanges0.low - testRunConfidencePercentanges1.low
	) +
	Math.abs(
		testRunConfidencePercentanges0.medium -
			testRunConfidencePercentanges1.medium
	) +
	Math.abs(
		testRunConfidencePercentanges0.high - testRunConfidencePercentanges1.high
	);

const testRunConfidenceScoresToTestRunConfidencePercentages = (
	testRunConfidences: Array<TestRunConfidence>
): TestRunConfidencePercentanges => ({
	low: testRunConfidenceScoresToTestRunConfidencePercentage(
		TestRunConfidence.LOW,
		testRunConfidences
	),
	medium: testRunConfidenceScoresToTestRunConfidencePercentage(
		TestRunConfidence.MEDIUM,
		testRunConfidences
	),
	high: testRunConfidenceScoresToTestRunConfidencePercentage(
		TestRunConfidence.HIGH,
		testRunConfidences
	),
});

const filterBranchByTimeRange = (
	branch: Branch,
	startTime: number,
	endTime: number
): Branch => ({
	...branch,
	testRuns: branch.testRuns.filter(
		(testRun) =>
			testRun.timestampUTC >= startTime && testRun.timestampUTC < endTime
	),
});

export const filterConfidenceFactorsByTimeRange = (
	confidenceFactors: ConfidenceFactors,
	startTime: number,
	endTime: number
): ConfidenceFactors => ({
	mainBranch: filterBranchByTimeRange(
		confidenceFactors.mainBranch,
		startTime,
		endTime
	),
	otherBranches: confidenceFactors.otherBranches.map((branch) =>
		filterBranchByTimeRange(branch, startTime, endTime)
	),
});
export type DataPoint = {
	title: string;
	score: number;
	timestamp: number;
};

const testResultWeight = 0.4;
const testCoverageWeight = 0.4;
const ambiguityWeight = 0.2;
export const getConfidenceScorePieces = (
	confidenceFactors: ConfidenceFactors
): Array<DataPoint> => {
	const allBranches: MainPlusOtherBranches = [
		confidenceFactors.mainBranch,
		...confidenceFactors.otherBranches,
	];

	const testRunConfidenceLevelsPerBranch: Array<Array<
		TestRunWithConfidence
	>> = allBranches.map((branch) =>
		branch.testRuns.map((testRun) => ({
			...testRun,
			confidence: testStatusAndPriorityToTestRunConfidence(
				testRun.status,
				testRun.priority
			),
		}))
	);

	const testRunConfidencePercentagesPerBranch = testRunConfidenceLevelsPerBranch
		.map((v) => v.map((i) => i.confidence))
		.map(testRunConfidenceScoresToTestRunConfidencePercentages);
	const testRunConfidenceLevelDiffs = testRunConfidencePercentagesPerBranch
		.slice(1) // after master branch
		.map((testRunConfidencePercentages) =>
			testRunConfidencePercentagesDiff(
				testRunConfidencePercentages,
				testRunConfidencePercentagesPerBranch[0]
			)
		);

	// gets a level of test-case confidence for all test cases
	// on all branches. for example, we may have 2 cases with
	// confidence level "HIGH", 3 cases with LOW and 2 cases with MEDIUM
	// [HIGH, HIGH, LOW, LOW, LOW, MEDIUM, MEDIUM]
	const testRunConfidenceLevels = testRunConfidenceLevelsPerBranch.reduce(
		(a, b) => [...a, ...b],
		[]
	);

	// this takes each test result (LOW, MEDIUM, or HIGH confidence)
	// and finds the average from 0.0 to 1.0
	const testResultScore: Array<DataPoint> = testRunConfidenceLevels.map(
		(testRunConfidence) => ({
			title: testRunConfidence.parentStoryTitle,
			score:
				((testRunConfidence.confidence === TestRunConfidence.LOW
					? 0.0
					: testRunConfidence.confidence === TestRunConfidence.MEDIUM
					? 0.5
					: 1.0) *
					testResultWeight) /
				testRunConfidenceLevels.length,
			timestamp: testRunConfidence.timestampUTC,
		})
	);

	// This looks at the number of test cases versus the total number
	// of test results present on 8base. It treats each branch as having equal
	// weight for the time being, although we can change this to operate using
	// totals across branches instead.
	const testCoverageScore: Array<DataPoint> = allBranches.map((branch) => ({
		title: 'Coverage for branch: ' + branch.name + '.',
		score:
			branch.totalRecordings === 0
				? 0
				: (branch.totalIsTestCase * testCoverageWeight) /
				  (allBranches.length * branch.totalRecordings),
		// for now, we make the timestamp now
		timestamp: new Date().getTime(),
	}));

	// this looks at the difference between the main branch and other branches
	// in terms of confidence levels. If there is a substantial diff in _either_
	// direction, the score is low. This is under the assumption that what we
	// are measuring is volatility, so that even if things improve on a branch
	// from a low baseline on main, we still rate it as low because it signifies
	// a lot of substantive changes (albeit for the better). We can change this
	// if it feels too counterintuitive.
	const ambiguityScore: Array<DataPoint> = testRunConfidenceLevelDiffs.map(
		(diff, i) => ({
			// TODO: hack in that the branch name is pulled back into the computation
			// which requires that the length of testRunConfidenceLevelDiffs
			// equals the length of allBranches
			// Find a way to push the branch name through the computation so that
			// this is not necessary.
			title: 'Coverage for branch: ' + allBranches[i].name + '.',
			score:
				(diff * ambiguityWeight) /
				(maxTestRunConfidencePercentagesDiff *
					testRunConfidenceLevelDiffs.length),
			// for now, we make the timestamp now
			timestamp: new Date().getTime(),
		})
	);

	return testResultScore.concat(testCoverageScore).concat(ambiguityScore);
};
