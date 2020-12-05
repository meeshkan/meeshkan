import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Layout from '../components/templates/layout';
import {
	Box,
	Stack,
	Text,
	useColorModeValue,
	Flex,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import GridCard from '../components/molecules/grid-card';
import { BookIcon, ChatIcon, PlusIcon } from '@frontend/chakra-theme';
import { transparentize } from '@chakra-ui/theme-tools';
import SegmentedControl from '../components/molecules/segmented-control';
import Table from '../components/organisms/table';
import { Column } from 'react-table';

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

const UserStoriesPage = ({ cookies }: UserStoryProps) => {
	const [state, setState] = useState({ data: [], loading: true });
	const [pagination, setPagination] = useState({
		page: 0,
		rowsPerPage: ROWS_PER_PAGE,
	});
	const [search, setSearch] = useState<string | undefined>();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const columns: Column[] = useMemo(
		() => [
			{
				Header: 'First Name',
				accessor: 'first_name',
				editable: true,
			},
			{
				Header: 'Last Name',
				accessor: 'last_name',
				editable: true,
			},
			{
				Header: 'Email',
				accessor: 'email',
				editable: false,
				collapse: true,
			},
			{
				Header: 'Active',
				type: 'boolean',
				accessor: 'active',
				collapse: true,
			},
		],
		[]
	);

	useEffect(() => {
		function fetchData() {
			setState((state) => ({
				...state,
				loading: true,
			}));
			fetch(
				`https://random-data-api.com/api/users/random_user?size=${pagination.rowsPerPage}`
			)
				.then((res) => res.json())
				.then((data) => {
					setState({ data, loading: false });
				});
		}
		fetchData();
	}, [pagination]);

	const handlePagination = useCallback(({ pageSize, pageIndex }) => {
		setPagination({ page: pageIndex, rowsPerPage: pageSize });
	}, []);

	const handleSearch = (searchText: string) => {
		console.log('search', searchText);
		setSearch(searchText);
	};

	const handleRemove = async (id: string) => {
		console.log('delete', id);
	};

	const handleEdit = (id: string) => {
		console.log('edit', id);
	};

	const handleClone = (id: string) => {
		console.log('clone', id);
	};

	const handleUpdateData = async (id: string, field: string, value: any) => {
		console.log('update data', id, field, value);
	};
	return (
		<Layout>
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
						<SegmentedControl values={['Recordings', 'Test cases']} />
						<Button size="sm">Review recordings</Button>
					</Flex>
					<Table
						columns={columns}
						data={state.data}
						loading={state.loading}
						totalCount={state.data.length} // this should be the total amount of data, not only the returned data length
						onPaginate={handlePagination}
						initialPageIndex={pagination.page}
						initialPageSize={pagination.rowsPerPage}
						onSearch={handleSearch}
						initialSearch={search}
						searchPlaceholder={'Search by...'}
						onAdd={onOpen}
						onRemove={handleRemove}
						onEdit={handleEdit}
						onClone={handleClone}
						onUpdateData={handleUpdateData}
						isSelectable={false}
					/>
				</Box>
			</Stack>
		</Layout>
	);
};

export { getServerSideProps } from '../components/molecules/chakra';

export default UserStoriesPage;
