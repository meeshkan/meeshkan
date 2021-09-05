import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	IconButton,
	Menu,
	MenuButton,
	Text,
	MenuDivider,
	MenuItem,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	Tooltip,
	useColorModeValue,
	Kbd,
} from '@chakra-ui/react';
import NavButton from './nav-button';
import { ChatIcon, PlusIcon, SettingsIcon } from '@frontend/chakra-theme';
import { ArrowUpDownIcon, QuestionIcon } from '@chakra-ui/icons';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';
import { show as showIntercom } from '../../utils/intercom';
import { UserContext } from '../../utils/user';
import { getProject } from '../../utils/project';
import { useRouter } from 'next/router';
import { createSlug } from '../../utils/createSlug';

type SelectedProject = {
	name: string;
	avatar?: {
		downloadUrl: string;
	};
};

type SideBarFooterProps = {
	isSettings?: boolean;
};

const SideBarFooter = ({ isSettings = false }: SideBarFooterProps) => {
	const {
		idToken,
		projects,
		project,
		setProject,
		loadingProject,
		setLoadingProject,
	} = useContext(UserContext);

	const [selectedProject, setSelectedProject] = useState<SelectedProject>(
		project as SelectedProject
	);

	useEffect(() => {
		setSelectedProject(project as SelectedProject);
	}, [project]);

	const mixpanel = useAnalytics();
	const router = useRouter();

	const menuButtonBackgroundColor = useColorModeValue('gray.50', 'gray.800');
	const avatarColor = useColorModeValue('gray.700', 'gray.200');
	const avatarBackgroundColor = useColorModeValue('gray.200', 'gray.600');
	const questionIconColor = useColorModeValue('gray.400', 'white');
	const shortcutColor = useColorModeValue('gray.500', 'gray.400');
	const menuButtonFlexColor = useColorModeValue('gray.500', 'gray.300');

	const projectName =
		project?.name || (router.query.projectName as string) || '';

	const slugifiedProjectName = useMemo(() => createSlug(projectName), [
		projectName,
	]);

	return (
		<Box>
			<NavButton
				onClick={() => {
					showIntercom();
					mixpanel.track('Help and Feedback');
				}}
				leftIcon={<ChatIcon />}
				mt={2}
			>
				Help and Feedback
			</NavButton>
			<NavButton
				isDisabled={isSettings}
				onClick={() => {
					router.push(`/${slugifiedProjectName}/settings`);
				}}
				aria-label="Settings"
				leftIcon={<SettingsIcon />}
				mt={2}
				isActive={isSettings}
			>
				Settings
				<Box w="100%" />
				<Flex fontSize="sm" color={shortcutColor}>
					<Kbd>s</Kbd>
				</Flex>
			</NavButton>
			<Divider my={4} />
			<Flex align="center">
				<Menu>
					<MenuButton
						as={Button}
						flex="1"
						p={0}
						m={0}
						size="sm"
						colorScheme="gray"
						backgroundColor={menuButtonBackgroundColor}
						textAlign="left"
						isLoading={loadingProject}
						isDisabled={loadingProject}
						display="block"
					>
						<Flex
							flex="1"
							align="center"
							justify="center"
							color={menuButtonFlexColor}
							fontWeight="600"
						>
							<Avatar
								src={selectedProject?.avatar?.downloadUrl}
								name={selectedProject?.name}
								icon={
									<QuestionIcon color={questionIconColor} fontSize="1rem" />
								}
								color={avatarColor}
								bg={avatarBackgroundColor}
								size="sm"
								borderRadius="md"
								mr={3}
							/>
							<Box
								flex="1"
								overflow="hidden"
								whiteSpace="nowrap"
								display="block"
								textOverflow="ellipsis"
								lineHeight="tall"
							>
								{selectedProject?.name}
							</Box>
							<ArrowUpDownIcon mx={3} />
						</Flex>
					</MenuButton>
					<MenuList maxH='85vh' overflow='auto'>
						<MenuOptionGroup value={project?.id} title="Projects" type="radio">
							{projects.map((project) => (
								<MenuItemOption
									key={project.id}
									value={project.id}
									onClick={async () => {
										mixpanel.track('Switch project', {
											destination: project.name,
										});

										setSelectedProject(project as SelectedProject);
										setLoadingProject(true);
										const selectedProject = await getProject(
											idToken,
											project.id
										);
										await setLoadingProject(false);
										setProject(selectedProject);
									}}
								>
									<Flex display="flex" alignItems="center">
										<Avatar
											src={project.avatar?.downloadUrl}
											name={project.name}
											icon={
												<QuestionIcon
													color={questionIconColor}
													fontSize="1rem"
												/>
											}
											color={avatarColor}
											bg={avatarBackgroundColor}
											size="xs"
											borderRadius="md"
											mr={3}
										/>
										<Text fontSize="sm" fontWeight="600">
											{project.name}
										</Text>
									</Flex>
								</MenuItemOption>
							))}
						</MenuOptionGroup>
						{isSettings ? null : (
							<>
								<MenuDivider />
								<MenuItem
									onClick={() => {
										router.push('/new-project');
									}}
								>
									<PlusIcon mr={3} />
									Create project
								</MenuItem>
							</>
						)}
					</MenuList>
				</Menu>
			</Flex>
		</Box>
	);
};

export default SideBarFooter;
