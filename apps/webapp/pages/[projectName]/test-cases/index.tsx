import React, {
	useState,
	useMemo,
	useCallback,
	useContext,
	ReactElement,
} from 'react';
import Router from 'next/router';
import {
	Box,
	Stack,
	Text,
	useColorModeValue,
	Flex,
	Button,
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
	MenuButton,
	Menu,
	MenuList,
	MenuItem,
	Checkbox,
	MenuGroup,
	MenuItemOption,
	MenuOptionGroup,
	OrderedList,
	Code,
	useColorMode,
} from '@chakra-ui/react';
import { Column } from 'react-table';
import {
	BookIcon,
	ChatIcon,
	PlusIcon,
	VideoIcon,
	CrosshairIcon,
	SortIcon,
	FilterIcon,
} from '@frontend/chakra-theme';
import GridCard from '../../../components/molecules/grid-card';
import Card from '../../../components/atoms/card';
import { useValidateSelectedProject } from '../../../hooks/use-validate-selected-project';
import ValidatedBillingPlan from '../../../components/molecules/validated-billing-plan';
import Table from '../../../components/organisms/table';
import LoadingScreen from '../../../components/organisms/loading-screen';
import NotFoundError from '../../404';
import { eightBaseClient } from '../../../utils/graphql';
import { UserContext } from '../../../utils/user';
import {
	UserStory,
	UserStoryFilter,
	UserStoryListResponse,
} from '@frontend/meeshkan-types';
import { show as showIntercom } from '../../../utils/intercom';
import { PROJECT_USER_STORIES } from '../../../graphql/project';
import { createSlug } from '../../../utils/createSlug';
import Link from 'next/link';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';
import DemoPlan from '../../../components/molecules/demo-plan';

type StartButtonProps = {
	icon: ReactElement;
	text: string;
	props?: BoxProps;
};

const StartButton = ({ icon, text, ...props }: StartButtonProps & BoxProps) => {
	const backgroundColor = useColorModeValue('cyan.50', 'transparentCyan.200');
	const color = useColorModeValue('cyan.700', 'cyan.50');
	return (
		<Box
			d="flex"
			alignItems="center"
			id={createSlug(text)}
			backgroundColor={backgroundColor}
			color={color}
			fontWeight="600"
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

interface UserStoriesAliased {
	all: {
		count: UserStoryListResponse['count'];
		items: UserStoryListResponse['items'];
	};
}

const UserStoriesPage = ({ cookies }: UserStoryProps) => {
	const { project, idToken } = useContext(UserContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const mixpanel = useAnalytics();
	const { colorMode } = useColorMode();

	const onDemoPlan = project?.configuration?.plan === 'Demo';

	const [tableLoading, setTableLoading] = useState(false);
	const [pageSize, setPageSize] = React.useState(10);
	const [tableData, setTableData] = useState<UserStoriesAliased>({
		all: {
			count: 0,
			items: [],
		},
	});
	const recordCount = tableData.all.count;

	const gettingStartedGreenColor = useColorModeValue('cyan.500', 'cyan.300');
	const gettingStartedGrayColor = useColorModeValue('gray.500', 'gray.400');
	const linkBlueColor = useColorModeValue('blue.500', 'blue.300');
	const modalHeaderColor = useColorModeValue('gray.900', 'white');

	const columns: Column<UserStory>[] = useMemo(
		() => [
			{
				Header: 'Title',
				accessor: 'title',
			},
			{
				Header: 'Created at',
				accessor: (originalRow, rowIndex) => {
					const humanDate = new Date(originalRow.createdAt);
					return humanDate.toLocaleDateString('en-US', {
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric',
						hour12: false,
						day: 'numeric',
						month: 'short',
					});
				},
			},
			{
				Header: '# repeated',
				accessor: (originalRow, rowIndex) => {
					return originalRow.flows.count;
				},
			},
			{
				Header: 'Origin',
				accessor: (originalRow, rowIndex) => {
					const { created } = originalRow;
					return (
						<Code
							display="flex"
							alignItems="center"
							maxW="fit-content"
							fontSize="sm"
							textTransform="capitalize"
							borderRadius="md"
							fontWeight="700"
							px={2}
							py={1}
							colorScheme={
								created === 'user'
									? 'cyan'
									: created === 'manual'
										? 'blue'
										: 'gray'
							}
						>
							{created === 'user' ? (
								<VideoIcon mr={3} />
							) : created === 'manual' ? (
								<CrosshairIcon mr={3} />
							) : null}
							{created}
						</Code>
					);
				},
			},
			{
				Header: 'Significance',
				accessor: (originalRow, rowIndex) => {
					const { significance } = originalRow;
					return (
						<Code
							fontSize="sm"
							textTransform="capitalize"
							borderRadius="md"
							fontWeight="700"
							px={2}
							py={1}
							colorScheme={
								significance === 'low'
									? 'gray'
									: significance === 'medium'
										? 'amber'
										: significance === 'high'
											? 'cyan'
											: null
							}
						>
							{significance}
						</Code>
					);
				},
			},
			{
				Header: 'Steps',
				accessor: (originalRow, rowIndex) => {
					return originalRow.scriptCommands.count;
				},
			},
		],
		[]
	);

	const projectId = project?.id;

	const [low, setLow] = useState(false);
	const [medium, setMedium] = useState(false);
	const [high, setHigh] = useState(false);
	const [user, setUser] = useState(false);
	const [manual, setManual] = useState(false);

	const testCaseFilters: UserStoryFilter['OR'] = [];
	if (low) {
		testCaseFilters.push({
			significance: {
				equals: 'low',
			},
		});
	}
	if (medium) {
		testCaseFilters.push({
			significance: {
				equals: 'medium',
			},
		});
	}
	if (high) {
		testCaseFilters.push({
			significance: {
				equals: 'high',
			},
		});
	}

	if (user) {
		testCaseFilters.push({
			created: {
				equals: 'user',
			},
		});
	}

	if (manual) {
		testCaseFilters.push({
			created: {
				equals: 'manual',
			},
		});
	}

	enum SortDirections {
		Newest = 'createdAt_DESC',
		Oldest = 'createdAt_ASC',
	}

	const [sort, setSort] = useState<SortDirections>(SortDirections.Newest);

	const fetchData = useCallback(
		({ pageSize, pageIndex }) => {
			const client = eightBaseClient(idToken);
			setTableLoading(true);
			const request = client
				.request(PROJECT_USER_STORIES, {
					projectId,
					first: pageSize,
					skip: pageSize * pageIndex,
					testCaseFilters,
					sort,
				})
				.then((res) => {
					setTableData(res);
					setPageSize(pageSize);
					setTableLoading(false);
				});
			return request;
		},
		[idToken, projectId, low, medium, high, user, manual, sort]
	);

	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);

	const { found, loading } = useValidateSelectedProject();
	if (loading) {
		return <LoadingScreen as={Card} />;
	}
	if (!found) {
		return <NotFoundError />;
	}

	return (
		<ValidatedBillingPlan>
			<Stack p={[6, 0, 0, 0]} w="100%" spacing={6}>
				{onDemoPlan && <DemoPlan />}
				<GridCard
					title="Getting started"
					subtitle="User stories are flows that your users take in your production application. They are called recordings when first made, and test cases once you approve the application behavior."
				>
					<Stack direction={['column', 'column', 'row']} spacing="32px">
						<StartButton
							icon={
								<BookIcon
									boxSize={8}
									color={gettingStartedGreenColor}
									strokeWidth="2.5"
								/>
							}
							text="Read the documentation"
							onClick={() => {
								mixpanel.track('Read the docs');
								Router.push('https://intercom.help/meeshkan-app/en/');
							}}
						/>
						<StartButton
							icon={
								<ChatIcon
									boxSize={8}
									color={gettingStartedGreenColor}
									strokeWidth="2.5"
								/>
							}
							text="Chat with an expert"
							onClick={() => {
								mixpanel.track('Chat with an expert');
								showIntercom();
							}}
						/>
						<Box
							id="create-a-new-user-story"
							d="flex"
							alignItems="center"
							border="1px dashed"
							borderColor={gettingStartedGrayColor}
							fontWeight="600"
							p={4}
							w="100%"
							borderRadius="md"
							onClick={() => {
								onOpen();
								mixpanel.track('Create new user story modal');
							}}
							_hover={{
								cursor: 'pointer',
							}}
						>
							<PlusIcon
								boxSize={8}
								color={gettingStartedGrayColor}
								strokeWidth="2.5"
							/>
							<Text ml={4}>Create a new test case</Text>
						</Box>
					</Stack>
				</GridCard>

				<Modal
					onClose={onClose}
					isOpen={isOpen}
					isCentered
					motionPreset="scale"
					size="xl"
					scrollBehavior="inside"
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader px={6} pt={4}>
							<Heading
								fontSize="xl"
								as="h3"
								lineHeight="tall"
								mb={2}
								color={modalHeaderColor}
							>
								How to create a new Test case
							</Heading>
							<Text fontWeight="400" fontSize="md">
								There are two ways to create test cases for your project.
							</Text>
						</ModalHeader>
						<Divider />
						<ModalCloseButton />
						<ModalBody px={6} pb={4} pt={8}>
							<OrderedList spacing={6}>
								<ListItem lineHeight="1.6">
									<strong>Recording production user behavior.</strong> This is
									the preferred method of recording as it's the best indication
									of meaningful test coverage.
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
												<ChakraLink color={linkBlueColor}>
													script tag
												</ChakraLink>
											</Link>{' '}
											in your frontend's production environment.
										</ListItem>
										<ListItem lineHeight="1.6">
											Once an hour has passed since installation, new user
											stories will be generated.
										</ListItem>
									</List>
								</ListItem>
								<ListItem lineHeight="1.6">
									<strong>Manually, using the chrome extension.</strong> This is
									is great if you are a developer or product manager testing a
									new feature where user behavior is still unknown but you'd
									like to test it as further development continues.
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
												color={linkBlueColor}
											>
												Install the chrome extension.
											</ChakraLink>{' '}
											This will provide instructions and the ability to manually
											create user stories with a 'record' button.
										</ListItem>
										<ListItem lineHeight="1.6">
											User stories get generated automatically in this process.
											You will be redirected back to the webapp, to the new user
											story after you click the extension again.
										</ListItem>
									</List>
								</ListItem>
							</OrderedList>
						</ModalBody>
						<ModalFooter p={6}>
							<Button onClick={onClose}>Okay, great!</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>

				<Box overflowX="auto" flex="1">
					<Flex justify="flex-end" align="center">
						<Flex align="center">
							<Menu>
								<MenuButton
									as={Button}
									size="sm"
									variant="ghost"
									sx={{
										mixBlendMode: colorMode === 'light' ? 'multiply' : 'normal',
									}}
									colorScheme="gray"
									fontWeight="400"
									mr={2}
									leftIcon={<SortIcon />}
								>
									Sort
								</MenuButton>
								<MenuList>
									<MenuOptionGroup
										defaultValue={sort}
										title="Order"
										type="radio"
										onChange={(event) =>
											setSort(
												event === 'createdAt_DESC'
													? SortDirections.Newest
													: SortDirections.Oldest
											)
										}
									>
										<MenuItemOption value={SortDirections.Newest}>
											Newest first
										</MenuItemOption>
										<MenuItemOption value={SortDirections.Oldest}>
											Oldest first
										</MenuItemOption>
									</MenuOptionGroup>
								</MenuList>
							</Menu>
							<Menu closeOnSelect={false}>
								<MenuButton
									as={Button}
									size="sm"
									variant="ghost"
									colorScheme="gray"
									sx={{
										mixBlendMode: colorMode === 'light' ? 'multiply' : 'normal',
									}}
									fontWeight="400"
									mr={0}
									leftIcon={<FilterIcon />}
								>
									Filter
								</MenuButton>
								<MenuList>
									<MenuGroup title="Significance">
										<MenuItem>
											<Checkbox
												isChecked={high}
												onChange={() => setHigh(!high)}
											>
												High significance
											</Checkbox>
										</MenuItem>
										<MenuItem>
											<Checkbox
												isChecked={medium}
												onChange={() => setMedium(!medium)}
											>
												Medium significance
											</Checkbox>
										</MenuItem>
										<MenuItem>
											<Checkbox isChecked={low} onChange={() => setLow(!low)}>
												Low significance
											</Checkbox>
										</MenuItem>
									</MenuGroup>

									<MenuGroup title="Origin">
										<MenuItem>
											<Checkbox
												isChecked={user}
												onChange={() => setUser(!user)}
											>
												User generated
											</Checkbox>
										</MenuItem>
										<MenuItem>
											<Checkbox
												isChecked={manual}
												onChange={() => setManual(!manual)}
											>
												Manually generated
											</Checkbox>
										</MenuItem>
									</MenuGroup>
								</MenuList>
							</Menu>
						</Flex>
					</Flex>

					<Table
						columns={columns}
						data={tableData.all.items}
						fetchData={fetchData}
						loading={tableLoading}
						pageCount={Math.ceil(
							(recordCount === 0 ? 1 : recordCount) / pageSize
						)}
					/>
				</Box>
			</Stack>
		</ValidatedBillingPlan>
	);
};

export { getServerSideProps } from '../../../components/molecules/chakra';

export default UserStoriesPage;
