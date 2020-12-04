import React, {
	useState,
	ReactElement,
	useRef,
	useEffect,
	ReactNode,
	ComponentType,
} from 'react';
import {
	TableCell,
	TableRow,
	TableHead,
	TableBody,
	TableIconButton,
	TablePagination,
} from '../molecules/table';
import ActionButton from '../atoms/action-button';
import {
	Text,
	Select,
	Stack,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Icon,
	Input,
	Button,
	IconButton,
	Box,
	Checkbox,
	usePrevious,
	useDisclosure,
	Skeleton,
	useColorModeValue,
} from '@chakra-ui/react';
import {
	usePagination,
	useSortBy,
	useTable,
	useRowSelect,
	Row,
	Column,
	useMountedLayoutEffect,
	useExpanded,
	useGroupBy,
} from 'react-table';
import { AnimatePresence } from 'framer-motion';
import Card from '../atoms/card';
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowUpDownIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
	DeleteIcon,
	EditIcon,
	SmallCloseIcon,
} from '@chakra-ui/icons';
import { CopyIcon } from '@frontend/chakra-theme';
import { useDebounce } from '../../hooks/use-debounce';

type UpdateDataFn = (id: string, field: string, value: any) => void;

type Actions = {
	label: string;
	icon: ComponentType;
	action: (rowId: string) => void;
};

type TableProps<T extends object = {}> = {
	data: any;
	initialPageSize?: number;
	initialPageIndex?: number;
	initialSearch?: string;
	totalCount?: number;
	loading?: boolean;
	columns: Column<T>[];
	renderRowSubComponent?: ({ row }: { row: any }) => ReactNode;
	onPaginate?: ({
		pageIndex,
		pageSize,
	}: {
		pageIndex: number;
		pageSize: number;
	}) => void;
	onSearch?: (search: string) => void;
	onAdd?: () => void;
	onEdit?: (id: string) => void;
	onRemove?: (id: string) => void;
	onClone?: (id: string) => void;
	onUpdateData?: UpdateDataFn;
	searchPlaceholder?: string;
	addButtonText?: string;
	isSelectable?: boolean;
	getRowId?: (row: any, relativeIndex: number, parent: any) => string;
	isRemoveAllowed?: (row: any) => boolean;
	customActions?: Actions[];
	filters?: ReactElement;
	form?: ReactElement;
	isFormOpen?: boolean;
	removeTitle?: string;
	removeMessage?: string;
	showExpander?: boolean;
	defaultGroupByColumnIds?: string[];
	defaultRowsExpanded?: boolean;
	getRowProps?: (row: any) => void;
	noDataMessage?: string;
};

const defaultPropGetter = () => ({});

const Table = ({
	columns,
	data,
	initialPageIndex = 0,
	initialPageSize = 10,
	initialSearch,
	totalCount,
	loading,
	onPaginate,
	onSearch,
	onAdd,
	onRemove,
	onEdit,
	onClone,
	onUpdateData,
	searchPlaceholder,
	addButtonText,
	isSelectable = true,
	getRowId,
	customActions,
	filters,
	form,
	isFormOpen,
	renderRowSubComponent,
	isRemoveAllowed,
	showExpander = true,
	defaultGroupByColumnIds,
	defaultRowsExpanded,
	getRowProps = defaultPropGetter,
	noDataMessage,
	...props
}: TableProps) => {
	const { removeTitle = 'Delete?', removeMessage } = props;
	const controlledPageCount = totalCount
		? Math.ceil(totalCount / initialPageSize)
		: 1;

	const hasActions = !!(onEdit || onClone || onRemove || customActions);

	const _getRowId = () => {
		if (getRowId) {
			return getRowId;
		}
		return (row: any) => {
			return row.id;
		};
	};

	const {
		isOpen: isRemoveAlertOpen,
		onOpen: onOpenRemoveAlert,
		onClose: onCancelRemove,
	} = useDisclosure();
	const idRef = React.useRef<string>();

	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		visibleColumns,
		toggleAllRowsExpanded,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: initialPageIndex,
				pageSize: initialPageSize,
				...(defaultGroupByColumnIds && { groupBy: defaultGroupByColumnIds }),
			},
			manualSortBy: true,
			manualPagination: true,
			pageCount: controlledPageCount,
			autoResetSelectedRows: false,
			autoResetExpanded: false,
			getRowId: _getRowId(),
			onUpdateData,
		},
		useGroupBy,
		useSortBy,
		useExpanded,
		usePagination,
		useRowSelect,
		// Here we will use a plugin to add our selection column
		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				if (!hasActions && !renderRowSubComponent) {
					return columns;
				}

				return [
					...(renderRowSubComponent && showExpander
						? [
								{
									// Make an expander cell
									Header: () => null, // No header
									id: 'expander', // It needs an ID
									Cell: ({ row }: any) => (
										// Use Cell to render an expander for each row.
										// We can use the getToggleRowExpandedProps prop-getter
										// to build the expander.
										<Box {...row.getToggleRowExpandedProps()}>
											<Icon
												name={`${
													row.isExpanded ? 'chevron-down' : 'chevron-right'
												}`}
												size="24px"
											/>
										</Box>
									),
								},
						  ]
						: []),
					...columns,
					...(hasActions
						? [
								{
									id: 'actions',
									// Don't show any header
									Header: () => null,
									// Render action icons in every cell in the last column
									Cell: ({ row }: any) => (
										<Box
											display="flex"
											justifyContent="center"
											mx={1}
											opacity={0}
											_groupHover={{ opacity: 1 }}
										>
											{customActions?.map((action, i) => {
												return (
													<ActionButton
														key={`${action.label}_${i}`}
														aria-label={action.label}
														// icon={action.icon}
														onClick={() => {
															action.action(row.id);
														}}
													/>
												);
											})}
											{onEdit && (
												<ActionButton
													aria-label="Edit"
													icon={<EditIcon />}
													ml={1}
													onClick={() => {
														onEdit(row.id);
													}}
												/>
											)}
											{onRemove && (
												<ActionButton
													aria-label="Delete"
													icon={<DeleteIcon />}
													ml={1}
													onClick={() => {
														idRef.current = row.id;
														onOpenRemoveAlert();
													}}
													isDisabled={isRemoveAllowed && !isRemoveAllowed(row)}
												/>
											)}
											{onClone && (
												<ActionButton
													aria-label="Clone row"
													icon={<CopyIcon />}
													ml={1}
													onClick={() => {
														onClone(row.id);
													}}
												/>
											)}
										</Box>
									),
								},
						  ]
						: []),
				];
			});
		}
	);

	const [search, setSearch] = useState<string | undefined>(initialSearch);
	const [isSearchActive, setSearchActive] = useState<boolean>(false);

	// this prevents calling paginate on first mount
	useMountedLayoutEffect(() => {
		if (onPaginate) {
			onPaginate({ pageIndex, pageSize });
		}
	}, [onPaginate, pageIndex, pageSize]);

	React.useEffect(() => {
		if (defaultRowsExpanded) {
			toggleAllRowsExpanded(defaultRowsExpanded);
		}
	}, [defaultRowsExpanded, toggleAllRowsExpanded, loading]);

	const debouncedSearchTerm = useDebounce(search, 250);

	useEffect(
		() => {
			if (typeof debouncedSearchTerm !== 'undefined') {
				onSearch?.(debouncedSearchTerm);
			}
		},
		[debouncedSearchTerm, onSearch] // Only call effect if debounced search term changes
	);

	const prevIndex = usePrevious(pageIndex) || 0;

	React.useEffect(() => {
		if (!data.length && !loading && prevIndex > 0) {
			gotoPage(prevIndex - 1);
		}
	}, [data, gotoPage, loading, prevIndex]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setSearch(event.target.value);

	const timeoutIdRef = useRef<NodeJS.Timeout>();
	const handleSearchBlur = (event: React.FocusEvent<any>) => {
		const currentTarget = event.currentTarget;

		// Check the newly focused element in the next tick of the event loop
		timeoutIdRef.current = setTimeout(() => {
			// Check if the new activeElement is a child of the original container
			if (!currentTarget.contains(document.activeElement)) {
				// You can invoke a callback or add custom logic here
				setSearchActive(false);
			}
		}, 0);
	};

	useEffect(() => {
		return () => {
			if (timeoutIdRef.current) {
				clearTimeout(timeoutIdRef.current);
			}
		};
	}, []);

	const handleConfirmRemove = () => {
		if (idRef?.current) {
			onRemove?.(idRef.current);
		}
		onCancelRemove();
	};

	return (
		<>
			<Stack
				isInline
				bg={useColorModeValue('gray.200', 'gray.700')}
				pos="relative"
				p={2}
				borderTopRightRadius="lg"
			>
				{filters}
			</Stack>
			{/* This is required to make the table full-width */}
			<Box
				maxW="full"
				display="block"
				overflowX={isFormOpen ? 'visible' : 'scroll'}
				overflowY={isFormOpen ? 'visible' : 'hidden'}
				css={{
					'::-webkit-scrollbar': {
						width: 0,
						height: 0,
					},
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
				}}
				roundedBottom={!onPaginate ? 'lg' : undefined}
			>
				<Box
					as="table"
					// Make sure the inner table is always as wide as needed
					w="full"
					{...(getTableProps() as any)}
				>
					<TableHead>
						{headerGroups.map((headerGroup) => (
							<TableRow {...(headerGroup.getHeaderGroupProps() as any)}>
								{headerGroup.headers.map((column) => {
									const isExpandable = column.id === 'expander';
									return (
										<TableCell
											bg={useColorModeValue('gray.200', 'gray.700')}
											w={
												!isExpandable && !column.collapse ? '1%' : '0.1%'
												// : '0.0000000001%'
											}
											{...(column.getHeaderProps() as any)}
											// {...column.getSortByToggleProps()}
										>
											<Text
												fontSize="xs"
												fontWeight="medium"
												textAlign={
													column.type === 'boolean'
														? 'center'
														: column.align || 'left'
												}
											>
												{column.render('Header')}
											</Text>
											{column.isSorted ? (
												column.isSortedDesc ? (
													<ChevronDownIcon size={20} />
												) : (
													<ChevronUpIcon size={20} />
												)
											) : (
												''
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableHead>

					{form && isFormOpen && (
						<TableBody>
							<TableRow _hover={undefined}>
								<TableCell
									colSpan={visibleColumns.length}
									p={0}
									fontSize="inherit"
								>
									<Card
										p={10}
										mx={-2}
										boxShadow="0 1px 2px 0 rgba(60,64,67,.30), 0 2px 6px 2px rgba(60,64,67,.15)"
									>
										{form}
									</Card>
								</TableCell>
							</TableRow>
						</TableBody>
					)}
					<TableBody>
						<AnimatePresence exitBeforeEnter>
							{loading && page.length > 0 && (
								<TableRow>
									<TableCell p={0} colSpan={visibleColumns.length}>
										{/* <LinearProgressBar key="progress" /> */}
									</TableCell>
								</TableRow>
							)}
						</AnimatePresence>
						{page.map((row, key) => {
							prepareRow(row);
							return (
								<React.Fragment key={key}>
									<TableRow
										onClick={() => {
											if (isSelectable) {
												row.toggleRowSelected();
												// onSelectRow?.(row.id);
											}
										}}
										// Merge user row props in
										{...(row.getRowProps(getRowProps(row) as any) as any)}
										role="group"
										isSelected={row.isSelected}
									>
										{row.cells.map((cell) => {
											const isEditable =
												typeof cell.column.editable === 'undefined' ||
												cell.column.editable;
											const isText =
												typeof cell.column.editable === 'undefined' ||
												cell.column.type === 'string';

											const isExpandable = cell.column.id === 'expander';
											const textAlign = cell.column.align || 'left';

											return (
												<TableCell
													w={
														isText && !isExpandable && !cell.column.collapse
															? '1%'
															: '0.1%'
													}
													_last={hasActions ? { w: '0.1%', p: 0 } : undefined}
													whiteSpace="nowrap"
													textAlign={textAlign}
													bg={
														cell.isPlaceholder
															? useColorModeValue('gray.200', 'gray.700')
															: undefined
													}
													{...(cell.getCellProps() as any)}
												>
													{cell.isPlaceholder
														? null
														: cell.render('Cell', {
																editable: isEditable,
																type: cell.column.type,
														  })}
												</TableCell>
											);
										})}
									</TableRow>
									{row.isExpanded ? (
										<TableRow>
											<TableCell p={0} colSpan={visibleColumns.length}>
												{renderRowSubComponent?.({ row: row.original })}
											</TableCell>
										</TableRow>
									) : null}
								</React.Fragment>
							);
						})}
						{loading && page.length === 0 ? (
							[...Array(pageSize)].map((_, i) => {
								return (
									<TableRow key={i} _hover={undefined}>
										{columns.map((col, j) => {
											return (
												<TableCell key={col.id || j}>
													<Skeleton h={5} />
												</TableCell>
											);
										})}
										{hasActions && (
											<TableCell _last={{ w: '0.5%' }}>
												<Skeleton h={5} />
											</TableCell>
										)}
									</TableRow>
								);
							})
						) : page.length === 0 ? (
							<TableRow _hover={undefined}>
								<TableCell
									textAlign="center"
									p={4}
									rowSpan={pageSize}
									colSpan={hasActions ? columns.length + 1 : columns.length}
								>
									<Text fontSize="sm">{noDataMessage || 'No Data'}</Text>
								</TableCell>
							</TableRow>
						) : null}
					</TableBody>
				</Box>
			</Box>
			{onPaginate && (
				<TablePagination
					justifyContent="space-between"
					flexDirection="row"
					roundedBottom="lg"
				>
					<Stack isInline spacing={2}>
						<TableIconButton
							onClick={() => gotoPage(0)}
							isDisabled={!canPreviousPage}
							icon={<ArrowLeftIcon />}
						/>
						<TableIconButton
							isDisabled={!canPreviousPage}
							onClick={() => previousPage()}
							icon={<ChevronLeftIcon />}
						/>
					</Stack>
					<Stack isInline flexWrap="nowrap" justify="center" align="center">
						<Text whiteSpace="nowrap" fontSize="xs">
							Page {pageIndex + 1} of {pageOptions.length}
						</Text>
						<Select
							size="sm"
							icon={<ArrowUpDownIcon />}
							value={pageSize}
							onChange={(e) => {
								setPageSize(Number(e.target.value));
							}}
							isDisabled={loading}
						>
							{[5, 10, 20, 30, 40, 50].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									{pageSize}
								</option>
							))}
						</Select>
					</Stack>
					<Stack isInline spacing={2}>
						<TableIconButton
							isDisabled={!canNextPage}
							onClick={() => nextPage()}
							icon={<ChevronRightIcon />}
						/>
						<TableIconButton
							onClick={() => gotoPage(pageCount ? pageCount - 1 : 1)}
							isDisabled={!canNextPage}
							icon={<ArrowRightIcon />}
						/>
					</Stack>
				</TablePagination>
			)}
			{/* <PromptDialog
				title={removeTitle!}
				message={removeMessage || ''}
				isOpen={isRemoveAlertOpen}
				onCancel={onCancelRemove}
				onConfirm={handleConfirmRemove}
			/> */}
		</>
	);
};

export default Table;
