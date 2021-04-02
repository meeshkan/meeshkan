import React, { useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createSlug } from '../../utils/createSlug';
import {
	Stack,
	Box,
	Flex,
	Spacer,
	useColorModeValue,
	Text,
	Heading,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
	ActivityIcon,
	VideoIcon,
	CheckSquareIcon,
	PackageIcon,
	SuitcaseIcon,
	ProfileIcon,
} from '@frontend/chakra-theme';
import NavButton from '../molecules/nav-button';
import { UserContext } from '../../utils/user';
import SideBarFooter from './sidebar-footer';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';

const SideBarBody = () => {
	const { projects, project } = useContext(UserContext);
	const router = useRouter();
	const hasProjects = projects.length > 0;
	const mixpanel = useAnalytics();
	const projectName =
		project?.name || (router.query.projectName as string) || '';
	const slugifiedProjectName = useMemo(() => createSlug(projectName), [
		projectName,
	]);

	const userStoriesHref = `/${slugifiedProjectName}/user-stories`;
	const testRunsHref = `/${slugifiedProjectName}/test-runs`;
	const isSettingsPage = router.pathname.endsWith('settings');

	const settingsHeadingColor = useColorModeValue('gray.900', 'gray.200');
	const headerColor = useColorModeValue('gray.400', 'gray.500');
	const headerBackgroundColor = useColorModeValue('gray.100', 'gray.800');

	if (isSettingsPage) {
		return (
			<>
				<Link href={`/${slugifiedProjectName}`} passHref>
					<a>
						<Heading
							as={Flex}
							align="center"
							fontSize="20px"
							fontWeight="500"
							color={settingsHeadingColor}
							lineHeight="1"
							mt={6}
						>
							<ChevronLeftIcon w={6} h={6} color="gray.500" />
							Settings
						</Heading>
					</a>
				</Link>
				<Stack mt={6} spacing={6} h="100%">
					<Box>
						<Flex align="flex-start">
							<Box rounded="xl" bg={headerBackgroundColor} p={2} mr={4}>
								<ProfileIcon color={headerColor} w={4} h={4} />
							</Box>
							<Stack spacing={2} w="full">
								<Heading
									fontSize="16px"
									fontWeight="500"
									color={headerColor}
									lineHeight="short"
									mt={1}
								>
									Personal
								</Heading>
								<NavButton
									onClick={() =>
										mixpanel.track('Navigation', {
											destination: '/settings#profile',
										})
									}
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#profile`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#profile`
									}
								>
									Profile
								</NavButton>
								<NavButton
									onClick={() =>
										mixpanel.track('Navigation', {
											destination: '/settings#notifications',
										})
									}
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#notifications`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#notifications`
									}
								>
									Notifications
								</NavButton>
							</Stack>
						</Flex>
					</Box>
					<Box>
						<Flex align="flex-start">
							<Box rounded="xl" bg={headerBackgroundColor} p={2} mr={4}>
								<SuitcaseIcon color={headerColor} w={4} h={4} />
							</Box>
							<Stack spacing={2} w="full">
								<Heading
									fontSize="16px"
									fontWeight="500"
									color={headerColor}
									lineHeight="short"
									mt={1}
								>
									Project
								</Heading>

								<NavButton
									onClick={() =>
										mixpanel.track('Navigation', {
											destination: '/settings#general',
										})
									}
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#general`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#general`
									}
								>
									General
								</NavButton>
								<NavButton
									onClick={() =>
										mixpanel.track('Navigation', {
											destination: '/settings#team-members',
										})
									}
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#team-members`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#team-members`
									}
								>
									Team members
								</NavButton>
								<NavButton
									onClick={() =>
										mixpanel.track('Navigation', {
											destination: '/settings#details',
										})
									}
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#details`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#details`
									}
								>
									Details
								</NavButton>
								<NavButton
									onClick={() =>
										mixpanel.track('Navigation', {
											destination: '/settings#plan-and-billing',
										})
									}
									disabled={true}
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#plan-and-billing`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#plan-and-billing`
									}
								>
									Plan and Billing
								</NavButton>
								<NavButton
									onClick={() =>
										mixpanel.track('Navigation', {
											destination: '/settings#integrations',
										})
									}
									disabled={true}
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#integrations`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#integrations`
									}
								>
									Integrations
								</NavButton>
							</Stack>
						</Flex>
					</Box>

					<Spacer />

					<SideBarFooter isSettings={true} />
				</Stack>
			</>
		);
	}

	return (
		<>
			{hasProjects ? (
				<Stack mt={6}>
					<NavButton
						onClick={() =>
							mixpanel.track('Navigation', {
								destination: 'dashboard',
							})
						}
						leftIcon={<ActivityIcon />}
						href={`/${slugifiedProjectName}`}
						isActive={
							router.pathname === '/' || router.pathname === `/[projectName]`
						}
					>
						Health dashboard
					</NavButton>
					<NavButton
						onClick={() =>
							mixpanel.track('Navigation', {
								destination: '/user-stories',
							})
						}
						leftIcon={<VideoIcon />}
						href={userStoriesHref}
						isActive={
							router.pathname.split('/').slice(-1)[0] === 'user-stories' ||
							router.asPath.includes('/user-stories')
						}
					>
						User stories
					</NavButton>
					<NavButton
						onClick={() =>
							mixpanel.track('Navigation', {
								destination: '/test-runs',
							})
						}
						leftIcon={<CheckSquareIcon />}
						href={testRunsHref}
						isActive={
							router.pathname.split('/').slice(-1)[0] === 'test-runs' ||
							router.asPath.includes('/test-runs')
						}
					>
						Test runs
					</NavButton>
					<NavButton leftIcon={<PackageIcon />} href="/releases" disabled>
						Releases
					</NavButton>
				</Stack>
			) : (
				<Text mt={4} fontStyle="italic">
					You need to finish creating your first project.
				</Text>
			)}
			<Spacer />
			<SideBarFooter />
		</>
	);
};

export default SideBarBody;
