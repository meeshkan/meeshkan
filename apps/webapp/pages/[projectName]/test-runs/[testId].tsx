import { useContext, useMemo } from 'react';
import {
	Heading,
	Flex,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import Link from 'next/link'
import _ from 'lodash';
import theme from '@frontend/chakra-theme';
import TestRunCard from '../../../components/molecules/test-run-card'
import Card from '../../../components/atoms/card';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import LoadingScreen from '../../../components/organisms/loading-screen';
import NotFoundError from '../../404';
import { UserContext } from '../../../utils/user';
import { createSlug } from '../../../utils/createSlug';

const TestRun = () => {
	const { found, loading } = useValidateSelectedProject();
	const { project } = useContext(UserContext);
	const router = useRouter();

	const slugifiedProjectName = useMemo(() => createSlug(project?.name), [
		project?.name,
	]);

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	if (!found) {
		return <NotFoundError />;
	}

	const { testId } = router.query;
	const testRun = _.find(
		project.release.items[0]?.testRuns?.items,
		(item) => item.id === testId 
	);

	return (
		<Stack p={[4, 0, 0, 0]} w="100%" rounded="lg" spacing={6}>
			<Link href={`/${slugifiedProjectName}/test-runs`} passHref>
				<a>
					<Heading
						as={Flex}
						align="center"
						fontSize="20px"
						fontWeight={500}
						color={useColorModeValue('gray.900', 'gray.200')}
						lineHeight="1"
						mt={6}
					>
						<ChevronLeftIcon w={6} h={6} color="gray.500" />
						Test runs
					</Heading>
				</a>
			</Link>
			<Flex direction="column" w="100%" p={[6, 0, 0, 0]}>
				<TestRunCard
					id={testId as string}
					status={testRun?.status}
					runNumber={1}
					date={new Date(testRun?.createdAt)}
					stats={_.countBy(
						testRun?.testOutcome.items
							.map(outcome => outcome.status)
					)}
				/>
			</Flex>
		</Stack>
	);
};

export default TestRun;
