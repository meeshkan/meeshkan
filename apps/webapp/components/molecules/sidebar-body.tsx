import React, { useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createSlug } from '../../utils/createSlug';
import {
	Stack,
	Box,
	Flex,
	useColorModeValue,
	Text,
	Heading,
	Code,
	Kbd,
} from '@chakra-ui/react';
import { ChevronLeftIcon, SearchIcon } from '@chakra-ui/icons';
import {
	ActivityIcon,
	CheckSquareIcon,
	PackageIcon,
	SuitcaseIcon,
	ProfileIcon,
	PlayIcon,
} from '@frontend/chakra-theme';
import NavButton from '../molecules/nav-button';
import { UserContext } from '../../utils/user';
import SideBarFooter from './sidebar-footer';

const SideBarBody = () => {
	const { projects, project } = useContext(UserContext);
	const router = useRouter();
	const hasProjects = projects.length > 0;
	const projectName =
		project?.name || (router.query.projectName as string) || '';
	const slugifiedProjectName = useMemo(
		() =>
			createSlug(
				projectName || (projects?.length > 0 && projects[0].name) || ''
			),
		[projectName]
	);

	const userStoriesHref = `/${slugifiedProjectName}/user-stories`;
	const testRunsHref = `/${slugifiedProjectName}/test-runs`;
	const isSettingsPage = router.pathname.endsWith('settings');

	const settingsHeadingColor = useColorModeValue('gray.900', 'gray.200');
	const headerColor = useColorModeValue('gray.400', 'gray.500');
	const headerBackgroundColor = useColorModeValue('gray.100', 'gray.800');
	const searchBorderColor = useColorModeValue('gray.200', 'gray.700');
	const searchTextColor = useColorModeValue('gray.500', 'gray.300');
	const searchFocusColor = useColorModeValue('blue.500', 'blue.300');
	const shortcutColor = useColorModeValue('gray.500', 'gray.400');

	if (isSettingsPage) {
		return (
			<Flex direction="column" justify="space-between" h="100%">
				<Stack spacing={6} mt={6}>
					<Link href={`/${slugifiedProjectName}`} passHref>
						<a id="settings-back">
							<Heading
								as={Flex}
								align="center"
								fontSize="20px"
								fontWeight="500"
								color={settingsHeadingColor}
								lineHeight="1"
							>
								<ChevronLeftIcon w={6} h={6} color="gray.500" />
								Settings
							</Heading>
						</a>
					</Link>
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
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#authentication`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#authentication`
									}
								>
									Authentication
								</NavButton>
								<NavButton
									fontSize="14px"
									href={`/${slugifiedProjectName}/settings#ci-integrations`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#ci-integrations`
									}
								>
									CI Integrations
								</NavButton>
								<NavButton
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
				</Stack>
				<SideBarFooter isSettings />
			</Flex>
		);
	}

	return (
		<Flex direction="column" justify="space-between" h="100%">
			{hasProjects ? (
				<>
					<Stack mt={4} flex="1">
						<Flex
							h={8}
							w="full"
							fontSize="sm"
							justify="space-between"
							align="center"
							border="1px solid"
							borderColor={searchBorderColor}
							borderRadius="md"
							px={3}
							mb={4}
							cursor="pointer"
							transition="all 0.2s"
							onClick={() => window?.CommandBar?.open()}
							_hover={{ borderColor: searchFocusColor }}
						>
							<Flex align="center" color={searchTextColor}>
								<SearchIcon boxSize={3} mr={3} />
								<Text>Search</Text>
							</Flex>
							<Flex color={shortcutColor}>
								<Kbd>⌘</Kbd> + <Kbd>k</Kbd>
							</Flex>
						</Flex>

						<NavButton
							leftIcon={<ActivityIcon />}
							href={`/${slugifiedProjectName}`}
							isActive={
								router.pathname === '/' || router.pathname === `/[projectName]`
							}
						>
							Health dashboard
							<Box w="100%" />
							<Flex fontSize="sm" color={shortcutColor}>
								<Kbd>d</Kbd>
							</Flex>
						</NavButton>
						<NavButton
							leftIcon={<CheckSquareIcon />}
							href={userStoriesHref}
							isActive={
								router.pathname.split('/').slice(-1)[0] === 'user-stories' ||
								router.asPath.includes('/user-stories')
							}
						>
							Test cases
							<Box w="100%" />
							<Flex fontSize="sm" color={shortcutColor}>
								<Kbd>c</Kbd>
							</Flex>
						</NavButton>
						<NavButton
							leftIcon={<PlayIcon />}
							href={testRunsHref}
							isActive={
								router.pathname.split('/').slice(-1)[0] === 'test-runs' ||
								router.asPath.includes('/test-runs')
							}
						>
							Test runs
							<Code ml={2} p={2} borderRadius="md" colorScheme="cyan">
								beta
							</Code>
							<Box w="100%" />
							<Flex fontSize="sm" color={shortcutColor}>
								<Kbd>r</Kbd>
							</Flex>
						</NavButton>
						<NavButton leftIcon={<PackageIcon />} href="/releases" disabled>
							Releases
						</NavButton>
					</Stack>
				</>
			) : (
				<Text mt={4} fontStyle="italic">
					You need to finish creating your first project.
				</Text>
			)}
			<SideBarFooter />
		</Flex>
	);
};

export default SideBarBody;
