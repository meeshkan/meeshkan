import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { ChatIcon, ArrowUpDownIcon } from '@chakra-ui/icons';
import {
	ActivityIcon,
	VideoIcon,
	CheckSquareIcon,
	PackageIcon,
	SettingsIcon,
} from '@frontend/chakra-theme';
import NavButton from '../molecules/nav-button';
import { transparentize } from '@chakra-ui/theme-tools';

const projects = [
	{ name: 'Acme Industries', avatar: 'https://example.com' },
	{ name: 'Meeshkan', avatar: 'https://example.com' },
];

const SideBarBody = () => {
	const [project, setProject] = useState(projects[0]);
	return (
		<>
			<Stack mt={6}>
				<NavButton isActive leftIcon={<ActivityIcon />}>
					Health dashboard
				</NavButton>
				<NavButton leftIcon={<VideoIcon />}>User stories</NavButton>
				<NavButton leftIcon={<CheckSquareIcon />}>Test runs</NavButton>
				<NavButton leftIcon={<PackageIcon />}>Releases</NavButton>
			</Stack>
			<Spacer />
			<Box>
				<NavButton leftIcon={<ChatIcon />} mt={2}>
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
								{projects.map((project, index) => (
									<MenuItemOption
										key={index}
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
