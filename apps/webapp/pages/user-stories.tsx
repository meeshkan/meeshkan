import React, {
	useState,
	useMemo,
	useEffect,
	useCallback,
	useContext,
} from 'react';
import {
	Box,
	Stack,
	Text,
	useColorModeValue,
	Flex,
	Button,
	Code,
	Badge,
} from '@chakra-ui/react';
import GridCard from '../components/molecules/grid-card';
import {
	BookIcon,
	ChatIcon,
	PlusIcon,
	VideoIcon,
	CrosshairIcon,
} from '@frontend/chakra-theme';
import { transparentize } from '@chakra-ui/theme-tools';
import SegmentedControl from '../components/molecules/segmented-control';
import Table from '../components/organisms/table';
import { Column } from 'react-table';
import { eightBaseClient } from '../utils/graphql';
import { UserContext } from '../utils/user';
import { PROJECT_USER_STORIES } from '../graphql/user-stories';

const ROWS_PER_PAGE = 10;

function StartButton({ icon, text }) {
	return (
		<Box
			d="flex"
			alignItems="center"
			// @ts-ignore
			backgroundColor={useColorModeValue(
				'cyan.50',
				transparentize('cyan.500', 0.15)
			)}
			color={useColorModeValue('cyan.700', 'cyan.50')}
			fontWeight={600}
			p={4}
			w="100%"
			borderRadius="md"
		>
			{icon}
			<Text ml={4}>{text}</Text>
		</Box>
	);
}

type UserStoryProps = {
	cookies: string | undefined;
};

interface Recordings {
	recordings: {
		count: number;
		items: Array<JSON>;
	};
	testCases: {
		count: number;
		items: Array<JSON>;
	};
}

const UserStoriesPage = ({ cookies }: UserStoryProps) => {
	const { idToken, projects } = useContext(UserContext);
	const [tableLoading, setTableLoading] = useState(false);
	const [tableData, setTableData] = useState<Recordings>({
		recordings: { count: 0, items: [] },
		testCases: { count: 0, items: [] },
	});
	const [toggleIndex, setToggleIndex] = React.useState(0);
	const [pagination, setPagination] = useState({
		page: 0,
		rowsPerPage: ROWS_PER_PAGE,
	});

	const columns: Column[] = useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'title',
			},
			{
				Header: 'Flows included',
				accessor: (originalRow, rowIndex) => {
					return originalRow.flowIDs.length;
				},
			},
			{
				Header: 'Origin',
				accessor: (originalRow, rowIndex) => {
					return (
						<Badge fontSize="sm" textTransform="capitalize">
							{originalRow.created == 'user' ? (
								<VideoIcon mr={2} />
							) : (
								<CrosshairIcon mr={2} />
							)}
							{originalRow.created}
						</Badge>
					);
				},
			},
			{
				Header: 'Priority',
				accessor: (originalRow, rowIndex) => {
					let significance = originalRow.significance;
					return (
						<Badge
							fontSize="sm"
							textTransform="capitalize"
							colorScheme={
								significance == 'low'
									? 'gray'
									: significance == 'medium'
									? 'orange'
									: significance == 'high'
									? 'cyan'
									: null
							}
						>
							{significance}
						</Badge>
					);
				},
			},
			{
				Header: 'Steps',
				accessor: (originalRow, rowIndex) => {
					let stepCount = JSON.parse(originalRow.recording.sideScript).tests[0]
						.commands.length;
					return stepCount;
				},
			},
		],
		[]
	);

	useEffect(() => {
		async function fetchData() {
			const client = eightBaseClient(idToken);
			setTableLoading(true);
			let request = await client
				.request(PROJECT_USER_STORIES, {
					projectId: projects[0].id,
					first: pagination.rowsPerPage,
					skip: pagination.rowsPerPage * pagination.page,
				})
				.then((res) => {
					setTableData(res);
					setTableLoading(false);
				});
			return request;
		}
		fetchData();
	}, [pagination]);

	const handlePagination = useCallback(({ pageSize, pageIndex }) => {
		setPagination({ page: pageIndex, rowsPerPage: pageSize });
	}, []);

	const handleRemove = async (id: string) => {
		console.log('delete', id);
	};

	const handleEdit = (id: string) => {
		console.log('edit', id);
	};

	const handleUpdateData = async (id: string, field: string, value: any) => {
		console.log('update data', id, field, value);
	};
	return (
		<Stack p={[6, 0, 0, 0]} w="100%" rounded="lg" spacing={6}>
			<GridCard title="Getting started">
				<Stack direction={['column', 'column', 'row']} spacing="32px">
					<StartButton
						icon={
							<BookIcon
								boxSize={8}
								color={useColorModeValue('cyan.500', 'cyan.300')}
								strokeWidth="2.5"
							/>
						}
						text="Read the documentation"
					/>
					<StartButton
						icon={
							<ChatIcon
								boxSize={8}
								color={useColorModeValue('cyan.500', 'cyan.300')}
								strokeWidth="2.5"
							/>
						}
						text="Chat with an expert"
					/>
					<Box
						d="flex"
						alignItems="center"
						border="1px dashed"
						// @ts-ignore
						borderColor={useColorModeValue('gray.500', 'gray.400')}
						fontWeight={600}
						p={4}
						w="100%"
						borderRadius="md"
					>
						<PlusIcon
							boxSize={8}
							color={useColorModeValue('gray.500', 'gray.400')}
							strokeWidth="2.5"
						/>
						<Text ml={4}>Create a new user story</Text>
					</Box>
				</Stack>
			</GridCard>
			<Box>
				<Flex justify="space-between" align="center">
					<SegmentedControl
						values={['Recordings', 'Test cases']}
						selectedIndex={toggleIndex}
						setSelectedIndex={setToggleIndex}
					/>
					{toggleIndex === 0 ? (
						<Button size="sm">Review recordings</Button>
					) : null}
				</Flex>
				<Table
					columns={columns}
					data={
						toggleIndex === 0
							? tableData.recordings.items
							: tableData.testCases.items
					}
					loading={tableLoading}
					totalCount={
						toggleIndex === 0
							? tableData.recordings.count
							: tableData.testCases.count
					} // this should be the total amount of data, not only the returned data length
					onPaginate={handlePagination}
					initialPageIndex={pagination.page}
					initialPageSize={pagination.rowsPerPage}
					onRemove={handleRemove}
					onEdit={handleEdit}
					onUpdateData={handleUpdateData}
					isSelectable={false}
				/>
			</Box>
		</Stack>
	);
};

export { getServerSideProps } from '../components/molecules/chakra';

export default UserStoriesPage;
