import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
	Table as ChakraTable,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/table';
import { useTable, usePagination, /*useSortBy,*/ Column } from 'react-table';
import {
	Flex,
	Text,
	IconButton,
	Select,
	Tooltip,
	useColorModeValue,
	Skeleton,
	ButtonGroup,
	Button,
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
	useDisclosure,
	DarkMode,
	useColorMode,
	MenuButton,
	Menu,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';
import { createSlug } from '../../utils/createSlug';
import { UserContext } from '../../utils/user';
import { File, UserStoryListResponse } from '@frontend/meeshkan-types';
import {
	DoubleArrowLeftIcon,
	ArrowLeftIcon,
	DoubleArrowRightIcon,
	ArrowRightIcon,
	ExternalLinkIcon,
	PlayIcon,
	MoreIcon,
	DownloadIcon,
	TrashIcon,
} from '@frontend/chakra-theme';
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import VideoPlayer from '../atoms/video-player';
import { DELETE_REJECTED_RECORDING } from '../../graphql/user-story';
import { mutate } from 'swr';
import { eightBaseClient } from '../../utils/graphql';
import { useToaster } from 'apps/webapp/hooks/use-toaster';

type TableProps = {
	columns: Column[];
	data: UserStoryListResponse['items'];
	fetchData: ({ pageSize, pageIndex }: any) => Promise<void>;
	loading?: boolean;
	pageCount: number;
};

const Table = ({
	columns,
	data,
	loading,
	pageCount: controlledPageCount,
	fetchData,
}: TableProps) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
			manualPagination: true,
			pageCount: controlledPageCount,
		},
		// useSortBy,
		usePagination
	);

	const router = useRouter();
	const [video, setVideo] = useState<File['downloadUrl']>();
	const { colorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const borderBottomColor = useColorModeValue('gray.100', 'gray.700');
	const backgroundColor = useColorModeValue('white', 'gray.900');
	const hoverBackgroundColor = useColorModeValue('gray.50', 'gray.800');
	const [deleting, setDeleting] = useState(false);
	const user = useContext(UserContext);
	const client = eightBaseClient(user?.idToken);
	const toaster = useToaster();
	const mixpanel = useAnalytics();

	const slugifiedProjectName = useMemo(
		() => createSlug(user?.project?.name || ''),
		[user?.project?.name]
	);

	const deleteRejectedRecording = async (userStoryId: string) => {
		await setDeleting(true);
		mixpanel.track('Delete a user story from the table');
		await client
			.request(DELETE_REJECTED_RECORDING, {
				userStoryId,
			})
			.then((res) =>
				res?.userStoryDelete?.success
					? toaster({
							status: 'success',
							title: 'The user story has been deleted.',
							description:
								'Rejecting a recording will delete the series of steps as a user story.',
					  })
					: toaster({
							status: 'error',
							title: 'The user story was not deleted.',
							description: 'Something went wrong, try again later.',
					  })
			);
		await setDeleting(false);
	};

	useEffect(() => {
		fetchData({ pageIndex, pageSize });
	}, [fetchData, pageIndex, pageSize, deleting]);

	return (
		<>
			<ChakraTable
				{...getTableProps()}
				variant="simple"
				backgroundColor={backgroundColor}
				borderTopRightRadius="lg"
				borderBottomRadius="lg"
				size="sm"
			>
				<Thead>
					{headerGroups.map((headerGroup) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{/* <Th fontSize="10px" p={3}>
								<Checkbox isDisabled />
							</Th> */}
							<Th fontSize="10px" p={3}>
								Video
							</Th>
							{headerGroup.headers.map((column) => (
								<Th
									{
										...column.getHeaderProps(/*column.getSortByToggleProps()*/)
									}
									fontSize="10px"
								>
									{column.render('Header')}
									{/* Add a sort direction indicator */}
									{column.isSorted ? (
										column.isSortedDesc ? (
											<ChevronDownIcon
												aria-label="Decending"
												ml={1}
												w={4}
												h={4}
											/>
										) : (
											<ChevronUpIcon
												aria-label="Ascending"
												ml={1}
												w={4}
												h={4}
											/>
										)
									) : (
										<ChevronDownIcon
											aria-label="placeholder"
											ml={1}
											w={4}
											h={4}
											color="transparent"
										/>
									)}
								</Th>
							))}
							<Th fontSize="10px" px={1}>
								{' '}
							</Th>
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()} fontSize="sm">
					{page.map((row) => {
						prepareRow(row);
						const rowId: number =
							typeof row.id === 'string' ? parseInt(row.id) : row.id;
						return (
							<Tr
								{...row.getRowProps()}
								borderBottom="1px solid"
								borderBottomColor={borderBottomColor}
								_last={{ border: 0 }}
								_hover={{
									cursor: 'pointer',
									backgroundColor: hoverBackgroundColor,
									borderBottom: '1px solid',
									borderBottomColor,
								}}
							>
								{/* <Td p={3} border={0}>
									<Checkbox borderRadius="md" icon={<CheckmarkIcon />} />
								</Td> */}
								{data[rowId].recording.video ? (
									<Td p={3} border={0}>
										<Skeleton isLoaded={!loading} borderRadius="md">
											<Button
												size="xs"
												variant="subtle"
												colorScheme="gray"
												sx={{
													mixBlendMode:
														colorMode === 'light' ? 'multiply' : 'normal',
												}}
												aria-label="Play the video associated with this user story"
												leftIcon={<PlayIcon strokeWidth="2px" />}
												onClick={() => {
													setVideo(data[rowId].recording.video.downloadUrl);
													onOpen();
												}}
											>
												PLAY
											</Button>
										</Skeleton>
									</Td>
								) : (
									<Td p={3} border={0}>
										<Skeleton isLoaded={!loading} borderRadius="md">
											<Button
												size="xs"
												variant="subtle"
												colorScheme="gray"
												aria-label="Play the video associated with this user story"
												leftIcon={<PlayIcon strokeWidth="2px" />}
												isDisabled
											>
												PLAY
											</Button>
										</Skeleton>
									</Td>
								)}

								{row.cells.map((cell) => {
									return (
										<Td
											onClick={() => {
												router.push(
													// @ts-expect-error
													`/${slugifiedProjectName}/user-stories/${row.original.id}`
												);
											}}
											border={0}
											{...cell.getCellProps()}
											py={3}
										>
											<Skeleton isLoaded={!loading} borderRadius="md">
												{cell.render('Cell')}
											</Skeleton>
										</Td>
									);
								})}
								<Td px={1} py={1} border={0}>
									<Skeleton
										isLoaded={!loading}
										borderRadius="md"
										maxW="fit-content"
									>
										<IconButton
											mr={2}
											size="xs"
											colorScheme="gray"
											sx={{
												mixBlendMode:
													colorMode === 'light' ? 'multiply' : 'normal',
											}}
											aria-label="Open in a new tab"
											icon={<ExternalLinkIcon />}
											onClick={() => {
												window.open(
													// @ts-expect-error
													`/${slugifiedProjectName}/user-stories/${row.original.id}`
												);
											}}
										/>
										<Menu>
											<Tooltip label="More" placement="bottom" hasArrow>
												<MenuButton
													as={IconButton}
													icon={<MoreIcon />}
													colorScheme="gray"
													size="xs"
													sx={{
														mixBlendMode:
															colorMode === 'light' ? 'multiply' : 'normal',
													}}
												/>
											</Tooltip>
											<MenuList>
												<MenuItem>
													<DownloadIcon mr={3} />
													Download Puppeteer script
												</MenuItem>
												<MenuItem
													isDisabled={deleting}
													onClick={() =>
														// @ts-expect-error
														deleteRejectedRecording(row.original.id)
													}
												>
													<TrashIcon mr={3} />
													Delete
												</MenuItem>
											</MenuList>
										</Menu>
									</Skeleton>
								</Td>
							</Tr>
						);
					})}

					{page.length === 0 &&
						(loading ? (
							[...Array(pageSize).keys()].map((key) => (
								<Tr
									borderBottom="1px solid"
									borderBottomColor={borderBottomColor}
									key={key}
								>
									<Td pr={0} pl={3} py={3} border={0}>
										<Skeleton borderRadius="md" height="20px" />
									</Td>
									{[...Array(6).keys()].map((key) => (
										<Td py={3} border={0} key={key}>
											<Skeleton borderRadius="md" height="20px" />
										</Td>
									))}
									<Td py={3} px={0} border={0}>
										<Skeleton borderRadius="md" height="20px" w="25px" />
									</Td>
								</Tr>
							))
						) : (
							<Tr _hover={undefined}>
								<Td textAlign="center" py={3} rowSpan={pageSize} colSpan={8}>
									<Text fontSize="md">No User Stories</Text>
								</Td>
							</Tr>
						))}
				</Tbody>
			</ChakraTable>

			<Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
				<ModalOverlay />
				<ModalContent backgroundColor="transparent" boxShadow="none">
					<DarkMode>
						<Button
							alignSelf="flex-end"
							size="sm"
							leftIcon={<CloseIcon />}
							colorScheme="gray"
							variant="ghost"
							maxW="fit-content"
							onClick={onClose}
						>
							Close
						</Button>
					</DarkMode>
					<ModalBody backgroundColor="transparent" p={0}>
						<VideoPlayer
							src={video}
							onStart={() =>
								mixpanel.track('User story table video play started')
							}
							onEnded={() =>
								mixpanel.track('User story table video play finished')
							}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>

			<Flex justifyContent="space-between" mt={4} alignItems="center" mx="auto">
				<Flex>
					<ButtonGroup isAttached colorScheme="gray" variant="link">
						<Tooltip label="First Page">
							<IconButton
								onClick={() => gotoPage(0)}
								isDisabled={!canPreviousPage}
								aria-label="First page"
								icon={<DoubleArrowLeftIcon h={4} w={4} />}
							/>
						</Tooltip>
						<Tooltip label="Previous Page">
							<IconButton
								onClick={previousPage}
								isDisabled={!canPreviousPage}
								aria-label="Previous page"
								icon={<ArrowLeftIcon h={4} w={4} />}
							/>
						</Tooltip>
					</ButtonGroup>
				</Flex>

				<Flex alignItems="center">
					<Text mr={8}>
						Page{' '}
						<Text fontWeight="bold" as="span">
							{pageIndex + 1}
						</Text>{' '}
						of{' '}
						<Text fontWeight="bold" as="span">
							{controlledPageCount}
						</Text>
					</Text>
					<Select
						size="sm"
						borderRadius="md"
						w={24}
						defaultValue={10}
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</Select>
				</Flex>

				<Flex>
					<ButtonGroup isAttached colorScheme="gray" variant="link">
						<Tooltip label="Next Page">
							<IconButton
								onClick={nextPage}
								isDisabled={!canNextPage}
								aria-label="Next page"
								icon={<ArrowRightIcon h={4} w={4} />}
							/>
						</Tooltip>
						<Tooltip label="Last Page">
							<IconButton
								onClick={() => gotoPage(pageCount - 1)}
								isDisabled={!canNextPage}
								aria-label="Last page"
								icon={<DoubleArrowRightIcon h={4} w={4} />}
							/>
						</Tooltip>
					</ButtonGroup>
				</Flex>
			</Flex>
		</>
	);
};

export default Table;
