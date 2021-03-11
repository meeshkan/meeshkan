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
	Checkbox,
	Button,
	Modal,
	ModalOverlay,
	ModalBody,
	ModalContent,
	useDisclosure,
	ModalCloseButton,
	DarkMode,
	Box,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createSlug } from '../../utils/createSlug';
import { UserContext } from '../../utils/user';
import { File, UserStoryListResponse } from '@frontend/meeshkan-types';
import {
	DoubleArrowLeftIcon,
	ArrowLeftIcon,
	DoubleArrowRightIcon,
	ArrowRightIcon,
	ExternalLinkIcon,
	CheckmarkIcon,
	PlayIcon,
} from '@frontend/chakra-theme';
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import VideoPlayer from '../atoms/video-player';

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

	useEffect(() => {
		fetchData({ pageIndex, pageSize });
	}, [fetchData, pageIndex, pageSize]);

	const { project } = useContext(UserContext);
	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);
	const router = useRouter();
	const [video, setVideo] = useState<File['downloadUrl']>();
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<ChakraTable
				{...getTableProps()}
				variant="simple"
				backgroundColor={useColorModeValue('white', 'gray.900')}
				borderTopRightRadius="lg"
				borderBottomRadius="lg"
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
						return (
							<Tr
								{...row.getRowProps()}
								borderBottom="1px solid"
								borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
								_last={{ border: 0 }}
								_hover={{
									cursor: 'pointer',
									backgroundColor: useColorModeValue('gray.50', 'gray.800'),
									borderBottom: '1px solid',
									borderBottomColor: useColorModeValue('gray.100', 'gray.700'),
								}}
							>
								{/* <Td p={3} border={0}>
									<Checkbox borderRadius="md" icon={<CheckmarkIcon />} />
								</Td> */}
								{data[row.id].recording.video ? (
									<Td p={3} border={0}>
										<Skeleton isLoaded={!loading} borderRadius="md">
											<Button
												size="xs"
												variant="subtle"
												colorScheme="gray"
												aria-label="Play the video associated with this user story"
												leftIcon={<PlayIcon strokeWidth="2px" />}
												onClick={() => {
													setVideo(data[row.id].recording.video.downloadUrl);
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
											<Box h={6} w="46px" />
										</Skeleton>
									</Td>
								)}

								{row.cells.map((cell) => {
									return (
										<Td
											onClick={() =>
												router.push(
													`/${slugifiedProjectName}/user-stories/${row.original.id}`
												)
											}
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
								<Td px={1} py={3} border={0}>
									<Skeleton isLoaded={!loading} borderRadius="md">
										<IconButton
											size="xs"
											colorScheme="gray"
											variant="subtle"
											aria-label="Open in a new tab"
											icon={<ExternalLinkIcon />}
											onClick={() => {
												window.open(
													`/${slugifiedProjectName}/user-stories/${row.original.id}`
												);
											}}
										/>
									</Skeleton>
								</Td>
							</Tr>
						);
					})}

					{page.length === 0 ? (
						<Tr _hover={undefined}>
							<Td
								textAlign="center"
								py={3}
								rowSpan={pageSize}
								colSpan={columns.length}
							>
								<Text fontSize="md">No User Stories</Text>
							</Td>
						</Tr>
					) : null}
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
					<ModalBody backgroundColor="transparent" px={8}>
						<VideoPlayer>
							<source src={video} type="video/webm" />
						</VideoPlayer>
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
