import { useContext } from 'react';
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
	Button,
	Text,
} from '@chakra-ui/react';
import { ChatIcon, ArrowUpDownIcon } from '@chakra-ui/icons';
import { transparentize } from '@chakra-ui/theme-tools';
import {
	ActivityIcon,
	VideoIcon,
	CheckSquareIcon,
	PackageIcon,
	SettingsIcon,
} from '@frontend/chakra-theme';
import NavButton from '../molecules/nav-button';
import { UserContext, Project } from '../../utils/user';

type SideBarBodyProps = {
	project: Project;
	setProject: (project: Project) => void;
};

const SideBarBody = ({ project, setProject }: SideBarBodyProps) => {
	const { projects } = useContext(UserContext);
	const hasProjects = projects.length > 0;
	return (
		<>
			{hasProjects ? (
				<Stack mt={6}>
					<NavButton leftIcon={<ActivityIcon />} href={`/`}>
						Health dashboard
					</NavButton>
					<NavButton leftIcon={<VideoIcon />} href={`/user-stories`}>
						User stories
					</NavButton>
					<NavButton leftIcon={<CheckSquareIcon />} href={`/test-runs`}>
						Test runs
					</NavButton>
					<NavButton leftIcon={<PackageIcon />} href={`/releases`}>
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
				<NavButton leftIcon={<ChatIcon />} mt={2} href="/help">
					Help and Feedback
				</NavButton>
				<Divider my={4} />
				<Flex align="center">
					<Menu>
						<MenuButton
							as={Button}
							size="sm"
							colorScheme="gray"
							// @ts-expect-error
							backgroundColor={useColorModeValue(
								'gray.50',
								transparentize('gray.800', 0.75)
							)}
							rightIcon={<ArrowUpDownIcon />}
							w="100%"
							textAlign="left"
						>
							{project.name}
						</MenuButton>
						<MenuList>
							<MenuOptionGroup
								defaultValue={project.name}
								title="Projects"
								type="radio"
							>
								{projects.map((project) => (
									<MenuItemOption
										key={project.id}
										value={project.name}
										onClick={() => setProject(project)}
									>
										{project.name}
									</MenuItemOption>
								))}
							</MenuOptionGroup>
						</MenuList>
					</Menu>
					<IconButton
						aria-label="Settings"
						colorScheme="gray"
						color={useColorModeValue('gray.500', 'gray.400')}
						icon={<SettingsIcon />}
						variant="ghost"
						size="sm"
						ml={2}
					/>
				</Flex>
			</Box>
		</>
	);
};

export default SideBarBody;
