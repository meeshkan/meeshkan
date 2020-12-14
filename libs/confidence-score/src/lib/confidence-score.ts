enum TestStatus {
	PASSING = 0,
	FAILING = 1,
	DID_NOT_RUN = 2,
}
enum TestPriority {
	LOW = 0,
	WARNING = 1,
	BLOCKING = 2,
}
enum TestCaseConfidence {
	LOW = 0,
	MEDIUM = 1,
	HIGH = 2,
}
type TestCaseConfidencePercentanges = {
	low: number;
	medium: number;
	high: number;
};
type TestCase = {
	status: TestStatus;
	priority: TestPriority;
	timestampUTC: number;
};
type Branch = {
	name: string;
	testCases: Array<TestCase>;
	totalRecordings: number;
};
type ConfidenceFactors = {
	mainBranch: Branch;
	otherBranches: Array<Branch>;
};

const testStatusAndPriorityToTestCaseConfidence = (
	testStatus: TestStatus,
	testPriority: TestPriority
): TestCaseConfidence =>
	testPriority === TestPriority.BLOCKING &&
	testStatus === TestStatus.DID_NOT_RUN
		? TestCaseConfidence.LOW
		: testPriority === TestPriority.WARNING &&
		  testStatus === TestStatus.DID_NOT_RUN
		? TestCaseConfidence.MEDIUM
		: testPriority === TestPriority.BLOCKING &&
		  testStatus === TestStatus.DID_NOT_RUN
		? TestCaseConfidence.LOW
		: testPriority === TestPriority.LOW && testStatus === TestStatus.DID_NOT_RUN
		? TestCaseConfidence.MEDIUM
		: testPriority === TestPriority.LOW && testStatus === TestStatus.FAILING
		? TestCaseConfidence.MEDIUM
		: TestCaseConfidence.HIGH;

const testCaseConfidenceScoresToTestCaseConfidencePercentage = (
	confidenceLevel: TestCaseConfidence,
	testCaseConfidences: Array<TestCaseConfidence>
): number =>
	testCaseConfidences.filter(
		(testCaseConfidence) => testCaseConfidence === confidenceLevel
	).length / testCaseConfidences.length;

const maxTestCaseConfidencePercentagesDiff = 2.0;
const testCaseConfidencePercentagesDiff = (
	testCaseConfidencePercentanges0: TestCaseConfidencePercentanges,
	testCaseConfidencePercentanges1: TestCaseConfidencePercentanges
): number =>
	Math.abs(
		testCaseConfidencePercentanges0.low - testCaseConfidencePercentanges1.low
	) +
	Math.abs(
		testCaseConfidencePercentanges0.medium -
			testCaseConfidencePercentanges1.medium
	) +
	Math.abs(
		testCaseConfidencePercentanges0.high - testCaseConfidencePercentanges1.high
	);

const testCaseConfidenceScoresToTestCaseConfidencePercentages = (
	testCaseConfidences: Array<TestCaseConfidence>
): TestCaseConfidencePercentanges => ({
	low: testCaseConfidenceScoresToTestCaseConfidencePercentage(
		TestCaseConfidence.LOW,
		testCaseConfidences
	),
	medium: testCaseConfidenceScoresToTestCaseConfidencePercentage(
		TestCaseConfidence.MEDIUM,
		testCaseConfidences
	),
	high: testCaseConfidenceScoresToTestCaseConfidencePercentage(
		TestCaseConfidence.HIGH,
		testCaseConfidences
	),
});

const filterBranchByTimeRange = (
	branch: Branch,
	startTime: number,
	endTime: number
): Branch => ({
	...branch,
	testCases: branch.testCases.filter(
		(testCase) =>
			testCase.timestampUTC >= startTime && testCase.timestampUTC < endTime
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

const testResultWeight = 0.4;
const testCoverageWeight = 0.4;
const ambiguityWeight = 0.2;
export default (confidenceFactors: ConfidenceFactors): number => {
	const allBranches: Array<Branch> = [confidenceFactors.mainBranch].concat(
		confidenceFactors.otherBranches
	);
	const blockingTests: number = allBranches
		.map(
			(branch) =>
				branch.testCases.map(
					(testCase) =>
						testCase.status === TestStatus.FAILING &&
						testCase.priority === TestPriority.BLOCKING
				).length
		)
		.reduce((a, b) => a + b, 0);
	if (blockingTests > 0) {
		return 0.0;
	}
	const testCaseConfidenceLevelsPerBranch = allBranches.map((branch) =>
		branch.testCases.map((testCase) =>
			testStatusAndPriorityToTestCaseConfidence(
				testCase.status,
				testCase.priority
			)
		)
	);
	const testCaseConfidencePercentagesPerBranch = testCaseConfidenceLevelsPerBranch.map(
		testCaseConfidenceScoresToTestCaseConfidencePercentages
	);
	const testCaseConfidenceLevelDiffs = testCaseConfidencePercentagesPerBranch
		.slice(1) // after master branch
		.map((testCaseConfidencePercentages) =>
			testCaseConfidencePercentagesDiff(
				testCaseConfidencePercentages,
				testCaseConfidencePercentagesPerBranch[0] || {
					// should never be empty
					// can use something like fp-ts NonEmptyArray in the future
					// to avoid clumsy syntax like this
					low: 1.0,
					medium: 0.0,
					high: 0.0,
				}
			)
		);

	// gets a level of test-case confidence for all test cases
	// on all branches. for example, we may have 2 cases with
	// confidence level "HIGH", 3 cases with LOW and 2 cases with MEDIUM
	// [HIGH, HIGH, LOW, LOW, LOW, MEDIUM, MEDIUM]
	const testCaseConfidenceLevels = testCaseConfidenceLevelsPerBranch.reduce(
		(a, b) => [...a, ...b],
		[]
	);

	// this takes each test result (LOW, MEDIUM, or HIGH confidence)
	// and finds the average from 0.0 to 1.0
	const testResultScore =
		testCaseConfidenceLevels
			.map((testCaseConfidence) =>
				testCaseConfidence === TestCaseConfidence.LOW
					? 0.0
					: testCaseConfidence === TestCaseConfidence.MEDIUM
					? 0.5
					: 1.0
			)
			.reduce((a, b) => a + b, 0) / testCaseConfidenceLevels.length;

	// This looks at the number of test cases versus the total number
	// of test results present on 8base. It treats each branch as having equal
	// weight for the time being, although we can change this to operate using
	// totals across branches instead.
	const testCoverageScore =
		allBranches
			.map((branch) => branch.testCases.length / branch.totalRecordings)
			.reduce((a, b) => a + b, 0.0) / allBranches.length;

	// this looks at the difference between the main branch and other branches
	// in terms of confidence levels. If there is a substantial diff in _either_
	// direction, the score is low. This is under the assumption that what we
	// are measuring is volatility, so that even if things improve on a branch
	// from a low baseline on main, we still rate it as low because it signifies
	// a lot of substantive changes (albeit for the better). We can change this
	// if it feels too counterintuitive.
	const ambiguityScore =
		testCaseConfidenceLevelDiffs.length === 0.0
			? 0.0
			: testCaseConfidenceLevelDiffs
					.map((diff) => diff / maxTestCaseConfidencePercentagesDiff)
					.reduce((a, b) => a + b, 0.0) / testCaseConfidenceLevelDiffs.length;
	return (
		testResultWeight * testResultScore +
		testCoverageWeight * testCoverageScore +
		ambiguityWeight * ambiguityScore
	);
};
