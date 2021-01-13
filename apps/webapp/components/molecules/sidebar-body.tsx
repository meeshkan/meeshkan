import React, { useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createSlug } from '../../utils/createSlug';
import {
	Stack,
	Box,
	Flex,
	Spacer,
	IconButton,
	useColorModeValue,
	Divider,
	Menu,
	MenuButton,
	MenuList,
	MenuOptionGroup,
	MenuItemOption,
	MenuItem,
	MenuDivider,
	Button,
	Text,
	Heading,
	Avatar,
	Tooltip,
} from '@chakra-ui/react';
import {
	ChatIcon,
	ArrowUpDownIcon,
	QuestionIcon,
	ChevronLeftIcon,
} from '@chakra-ui/icons';
import { transparentize } from '@chakra-ui/theme-tools';
import {
	ActivityIcon,
	VideoIcon,
	CheckSquareIcon,
	PackageIcon,
	SettingsIcon,
	PlusIcon,
	SuitcaseIcon,
	ProfileIcon,
} from '@frontend/chakra-theme';
import NavButton from '../molecules/nav-button';
import { UserContext } from '../../utils/user';
import { show as showIntercom } from '../../utils/intercom';

const SideBarBody = () => {
	const { projects, project, setProject } = useContext(UserContext);
	const router = useRouter();
	const hasProjects = projects.length > 0;
	const avatarUrl = project?.avatar?.downloadUrl;
	const projectName = project?.name || router.query.projectName as string || ''
	const slugifiedProjectName = useMemo(
		() => createSlug(projectName),
		[projectName]
	);

	const userStoriesHref = `/${slugifiedProjectName}/user-stories`;
	const isSettingsPage = router.pathname.endsWith('settings');

	if (isSettingsPage) {
		return (
			<>
				<Link href={`/${slugifiedProjectName}`} passHref>
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
							Settings
						</Heading>
					</a>
				</Link>
				<Stack mt={6} spacing={6}>
					<Box>
						<Flex align="flex-start">
							<Box
								rounded="xl"
								bg={useColorModeValue('gray.100', 'gray.800')}
								p={2}
								mr={4}
							>
								<ProfileIcon
									color={useColorModeValue('gray.400', 'gray.500')}
									w={4}
									h={4}
								/>
							</Box>
							<Stack spacing={2} w="full">
								<Heading
									fontSize="16px"
									fontWeight={500}
									color={useColorModeValue('gray.400', 'gray.500')}
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
							<Box
								rounded="xl"
								bg={useColorModeValue('gray.100', 'gray.800')}
								p={2}
								mr={4}
							>
								<SuitcaseIcon
									color={useColorModeValue('gray.400', 'gray.500')}
									w={4}
									h={4}
								/>
							</Box>
							<Stack spacing={2} w="full">
								<Heading
									fontSize="16px"
									fontWeight={500}
									color={useColorModeValue('gray.400', 'gray.500')}
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
									href={`/${slugifiedProjectName}/settings#script-tag`}
									isActive={
										router.asPath ===
										`/${slugifiedProjectName}/settings#details`
									}
								>
									Script tag
								</NavButton>
								<NavButton
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
			</>
		);
	}

	return (
		<>
			{hasProjects ? (
				<Stack mt={6}>
					<NavButton
						leftIcon={<ActivityIcon />}
						href={`/${slugifiedProjectName}`}
						isActive={
							router.pathname === '/' || router.pathname === `/[projectName]`
						}
					>
						Health dashboard
					</NavButton>
					<NavButton
						leftIcon={<VideoIcon />}
						href={userStoriesHref}
						isActive={
							router.pathname.split('/').slice(-1)[0] === 'user-stories' ||
							router.asPath.includes('/user-stories')
						}
					>
						User stories
					</NavButton>
					<NavButton leftIcon={<CheckSquareIcon />} href="/test-runs" disabled>
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
			<Box>
				<NavButton onClick={showIntercom} leftIcon={<ChatIcon />} mt={2}>
					Help and Feedback
				</NavButton>
				<Divider my={4} />
				<Flex align="center">
					<Menu>
						<MenuButton
							as={Button}
							p={0}
							m={0}
							size="sm"
							colorScheme="gray"
							// @ts-expect-error
							backgroundColor={useColorModeValue(
								'gray.50',
								transparentize('gray.800', 0.75)
							)}
							rightIcon={<ArrowUpDownIcon mr={3} />}
							w="100%"
							textAlign="left"
						>
							<Flex
								align="center"
								color={useColorModeValue('gray.500', 'gray.300')}
								fontWeight={600}
							>
								<Avatar
									src={avatarUrl}
									name={project?.name}
									icon={
										<QuestionIcon
											color={useColorModeValue('gray.400', 'white')}
											fontSize="1rem"
										/>
									}
									color={useColorModeValue('gray.700', 'gray.200')}
									bg={useColorModeValue('gray.200', 'gray.600')}
									size="sm"
									borderRadius="md"
									mr={3}
								/>
								{project?.name}
							</Flex>
						</MenuButton>
						<MenuList>
							<MenuOptionGroup
								defaultValue={project?.name}
								title="Projects"
								type="radio"
							>
								{projects.map((project) => (
									<MenuItemOption
										key={project.id}
										value={project.name}
										onClick={() => setProject(project)}
									>
										<Flex display="flex" alignItems="center">
											<Avatar
												src={project.avatar?.downloadUrl}
												name={project.name}
												icon={
													<QuestionIcon
														color={useColorModeValue('gray.400', 'white')}
														fontSize="1rem"
													/>
												}
												color={useColorModeValue('gray.700', 'gray.200')}
												bg={useColorModeValue('gray.200', 'gray.600')}
												size="xs"
												borderRadius="md"
												mr={3}
											/>
											<Text fontSize="sm" fontWeight={600}>
												{project.name}
											</Text>
										</Flex>
									</MenuItemOption>
								))}
							</MenuOptionGroup>
							<MenuDivider />
							<MenuItem onClick={() => router.push('/new-project')}>
								<PlusIcon mr={3} />
								Create project
							</MenuItem>
						</MenuList>
					</Menu>
					<Tooltip hasArrow label="Settings" borderRadius="md" p={2}>
						<IconButton
							aria-label="Settings"
							colorScheme="gray"
							color={useColorModeValue('gray.500', 'gray.400')}
							icon={<SettingsIcon />}
							onClick={() => router.push(`/${slugifiedProjectName}/settings`)}
							variant="ghost"
							size="sm"
							ml={2}
						/>
					</Tooltip>
				</Flex>
			</Box>
		</>
	);
};

export default SideBarBody;
