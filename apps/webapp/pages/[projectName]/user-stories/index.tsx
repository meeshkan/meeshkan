import React, {
	useState,
	useMemo,
	useCallback,
	useContext,
	ReactElement,
} from 'react';
import Router, { useRouter } from 'next/router';
import {
	Box,
	Stack,
	Text,
	useColorModeValue,
	Flex,
	Button,
	Badge,
	BoxProps,
	useDisclosure,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ListItem,
	List,
	Heading,
	Link as ChakraLink,
	Divider,
} from '@chakra-ui/react';
import { Column } from 'react-table';
import {
	BookIcon,
	ChatIcon,
	PlusIcon,
	VideoIcon,
	CrosshairIcon,
} from '@frontend/chakra-theme';
import GridCard from '../../../components/molecules/grid-card';
import Card from '../../../components/atoms/card';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import SegmentedControl from '../../../components/molecules/segmented-control';
import Table from '../../../components/organisms/table';
import LoadingScreen from '../../../components/organisms/loading-screen';
import NotFoundError from '../../404';
import { eightBaseClient } from '../../../utils/graphql';
import { UserContext } from '../../../utils/user';
import { show as showIntercom } from '../../../utils/intercom';
import { PROJECT_USER_STORIES } from '../../../graphql/project';
import { createSlug } from '../../../utils/createSlug';
import Link from 'next/link';

type StartButtonProps = {
	icon: ReactElement;
	text: string;
	props?: BoxProps;
};

const StartButton = ({ icon, text, ...props }: StartButtonProps & BoxProps) => {
	return (
		<Box
			d="flex"
			alignItems="center"
			backgroundColor={useColorModeValue('cyan.50', 'transparentCyan.200')}
			color={useColorModeValue('cyan.700', 'cyan.50')}
			fontWeight={600}
			p={4}
			w="100%"
			borderRadius="md"
			cursor="pointer"
			{...props}
		>
			{icon}
			<Text ml={4}>{text}</Text>
		</Box>
	);
};

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
	const router = useRouter();
	const { project, idToken } = useContext(UserContext);

	const [toggleIndex, setToggleIndex] = useState(0);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [tableLoading, setTableLoading] = useState(false);
	const [tableData, setTableData] = useState<Recordings>({
		recordings: { count: 0, items: [] },
		testCases: { count: 0, items: [] },
	});
	const [pagination, setPagination] = useState({
		page: 0,
		rowsPerPage: 10,
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
						<Badge
							fontSize="sm"
							textTransform="capitalize"
							borderRadius="md"
							p={2}
						>
							{originalRow.created === 'user' ? (
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
				Header: 'Significance',
				accessor: (originalRow, rowIndex) => {
					const { significance } = originalRow;
					return (
						<Badge
							fontSize="sm"
							textTransform="capitalize"
							borderRadius="md"
							p={2}
							colorScheme={
								significance === 'low'
									? 'gray'
									: significance === 'medium'
									? 'orange'
									: significance === 'high'
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
					const stepCount = JSON.parse(
						originalRow.recording.items[0].sideScript
					).tests[0].commands.length;
					return stepCount;
				},
			},
		],
		[]
	);

	const projectId = project?.id;
	const fetchData = useCallback(
		({ pageSize, pageIndex, ...rest }) => {
			const client = eightBaseClient(idToken);
			setTableLoading(true);
			const request = client
				.request(PROJECT_USER_STORIES, {
					projectId,
					first: pagination.rowsPerPage,
					skip: pagination.rowsPerPage * pagination.page,
				})
				.then((res) => {
					setTableData(res);
					setTableLoading(false);
				});
			return request;
		},
		[pagination.page, pagination.rowsPerPage, idToken, projectId]
	);

	const handlePagination = useCallback(({ pageSize, pageIndex }) => {
		setPagination({ page: pageIndex, rowsPerPage: pageSize });
	}, []);

	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);

	const handleEdit = (id: string) => {
		router.push(`/${slugifiedProjectName}/user-stories/${id}`);
	};

	const { found, loading } = useValidateSelectedProject();

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	if (!found) {
		return <NotFoundError />;
	}

	return (
		<Stack p={[6, 0, 0, 0]} w="100%" spacing={6}>
			<GridCard
				title="Getting started"
				subtitle="User stories are flows that your users take in your production application. They are called recordings when first made, and test cases once you approve the application behavior."
			>
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
						onClick={() => Router.push('https://meeshkan.com/docs')}
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
						onClick={showIntercom}
					/>
					<Box
						d="flex"
						alignItems="center"
						border="1px dashed"
						borderColor={useColorModeValue('gray.500', 'gray.400')}
						fontWeight={600}
						p={4}
						w="100%"
						borderRadius="md"
						onClick={onOpen}
						_hover={{ cursor: 'pointer' }}
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

			<Modal
				onClose={onClose}
				isOpen={isOpen}
				isCentered
				motionPreset="scale"
				size="xl"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader px={6} pt={4}>
						<Heading
							fontSize="xl"
							as="h3"
							lineHeight="tall"
							mb={2}
							color={useColorModeValue('gray.900', 'white')}
						>
							How to create a new User Story
						</Heading>
						<Text fontWeight={400} fontSize="md">
							There are two ways to create user stories for your project.
						</Text>
					</ModalHeader>
					<Divider />
					<ModalCloseButton />
					<ModalBody px={6} pb={4} pt={8}>
						<List
							spacing={6}
							listStyleType="ordered"
							listStylePosition="inside"
						>
							<ListItem lineHeight="1.6">
								<strong>Recording production user behavior.</strong> This is the
								preferred method of recording as it's the best indication of
								meaningful test coverage.
								<List
									listStyleType="disc"
									listStylePosition="inside"
									mt={2}
									ml={4}
								>
									<ListItem lineHeight="1.6">
										Make sure your team has installed the{' '}
										<Link
											href={`/${slugifiedProjectName}/settings#details`}
											passHref
										>
											<ChakraLink
												color={useColorModeValue('blue.500', 'blue.300')}
											>
												script tag
											</ChakraLink>
										</Link>{' '}
										in your frontend's production environment.
									</ListItem>
									<ListItem lineHeight="1.6">
										Once an hour after installed, new user stories will be
										generated.
									</ListItem>
								</List>
							</ListItem>
							<ListItem lineHeight="1.6">
								<strong>Manually using the chrome extension.</strong> This is
								great if you are a developer or product manager testing a new
								feature where user behavior is still unknown but you'd like to
								test it as further development continues.
								<List
									listStyleType="disc"
									listStylePosition="inside"
									mt={2}
									ml={4}
								>
									<ListItem lineHeight="1.6">
										<ChakraLink
											href="https://chrome.google.com/webstore/detail/meeshkan-recorder/cfjdddhjecoeahjkmegbkakfpppflmgo?hl=en"
											isExternal
											color={useColorModeValue('blue.500', 'blue.300')}
										>
											Install the chrome extension.
										</ChakraLink>
									</ListItem>
									<ListItem lineHeight="1.6">
										User stories get generated automatically in this process.
									</ListItem>
								</List>
							</ListItem>
						</List>
					</ModalBody>
					<ModalFooter p={6}>
						<Button onClick={onClose}>Okay, great!</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Box overflow="auto" flex="1">
				<Flex justify="space-between" align="center">
					<SegmentedControl
						values={['Recordings', 'Test cases']}
						selectedIndex={toggleIndex}
						setSelectedIndex={setToggleIndex}
					/>
					{toggleIndex === 0 ? (
						<Button size="sm" disabled={true}>
							Review recordings
						</Button>
					) : null}
				</Flex>

				<Table
					columns={columns}
					data={
						toggleIndex === 0
							? tableData.recordings.items
							: tableData.testCases.items
					}
					fetchData={fetchData}
					loading={tableLoading}
					totalCount={
						toggleIndex === 0
							? tableData.recordings.count
							: tableData.testCases.count
					} // this should be the total amount of data, not only the returned data length
					onPaginate={handlePagination}
					initialPageIndex={pagination.page}
					initialPageSize={pagination.rowsPerPage}
					onEdit={handleEdit}
				/>
			</Box>
		</Stack>
	);
};

export { getServerSideProps } from '../../../components/molecules/chakra';

export default UserStoriesPage;
