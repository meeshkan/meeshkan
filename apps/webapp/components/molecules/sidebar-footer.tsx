import React, { useContext, useMemo } from 'react';
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
} from '@chakra-ui/react';
import NavButton from './nav-button';
import { ChatIcon, PlusIcon, SettingsIcon } from '@frontend/chakra-theme';
import { ArrowUpDownIcon, QuestionIcon } from '@chakra-ui/icons';
import { show as showIntercom } from '../../utils/intercom';
import { UserContext } from '../../utils/user';
import { useRouter } from 'next/router';
import { createSlug } from '../../utils/createSlug';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';

type SideBarFooterProps = {
	isSettings?: boolean;
};

const SideBarFooter = ({ isSettings = false }: SideBarFooterProps) => {
	const { projects, project, setProject } = useContext(UserContext);
	const avatarUrl = project?.avatar?.downloadUrl;
	const mixpanel = useAnalytics();
	const router = useRouter();

	const menuButtonBackgroundColor = useColorModeValue('gray.50', 'gray.800');
	const avatarColor = useColorModeValue('gray.700', 'gray.200');
	const avatarBackgroundColor = useColorModeValue('gray.200', 'gray.600');
	const questionIconColor = useColorModeValue('gray.400', 'white');
	const tooltipColor = useColorModeValue('gray.500', 'gray.400');
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
			<Divider my={4} />
			<Flex align="center">
				<Menu>
					<MenuButton
						as={Button}
						p={0}
						m={0}
						size="sm"
						colorScheme="gray"
						backgroundColor={menuButtonBackgroundColor}
						rightIcon={<ArrowUpDownIcon mr={3} />}
						w="100%"
						textAlign="left"
					>
						<Flex
							align="center"
							color={menuButtonFlexColor}
							fontWeight="600"
							maxW="20ch"
							whiteSpace="nowrap"
							overflow="hidden"
						>
							<Avatar
								src={avatarUrl}
								name={project?.name}
								icon={
									<QuestionIcon color={questionIconColor} fontSize="1rem" />
								}
								color={avatarColor}
								bg={avatarBackgroundColor}
								size="sm"
								borderRadius="md"
								mr={3}
							/>
							{project?.name}
						</Flex>
					</MenuButton>
					<MenuList>
						<MenuOptionGroup value={project?.id} title="Projects" type="radio">
							{projects.map((project) => (
								<MenuItemOption
									key={project.id}
									value={project.id}
									onClick={() => {
										mixpanel.track('Switch project', {
											destination: project.name,
										});
										setProject(project);
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
										mixpanel.track('Navigation', {
											destination: '/new-project',
										});
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
				<Tooltip hasArrow label="Settings">
					<IconButton
						aria-label="Settings"
						colorScheme="gray"
						color={tooltipColor}
						icon={<SettingsIcon />}
						onClick={() => {
							mixpanel.track('Navigation', { destination: '/settings' });
							router.push(`/${slugifiedProjectName}/settings`);
						}}
						variant="ghost"
						size="sm"
						ml={2}
						isDisabled={isSettings}
					/>
				</Tooltip>
			</Flex>
		</Box>
	);
};

export default SideBarFooter;
