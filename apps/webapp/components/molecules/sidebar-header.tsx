import {
	Box,
	Flex,
	Spacer,
	Button,
	IconButton,
	useColorModeValue,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useColorMode,
} from '@chakra-ui/react';
import { LogoIcon, InboxIcon, MoonIcon, SunIcon } from '@frontend/chakra-theme';
import { ChevronDownIcon } from '@chakra-ui/icons';
import MenuToggleButton from '../molecules/menu-toggle-button';

type SideBarHeaderProps = {
	toggle: (i?: number) => void;
};

const SideBarHeader = ({ toggle }: SideBarHeaderProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Flex align="center">
			<Box>
				<LogoIcon width="auto" height={6} />
			</Box>
			<Spacer />
			<Flex align="center">
				<IconButton
					aria-label="Inbox"
					variant="ghost"
					size="sm"
					icon={<InboxIcon w={4} h={4} />}
					color={useColorModeValue('gray.500', 'gray.400')}
					colorScheme="gray"
					mr={2}
				/>
				<Menu closeOnSelect={false}>
					<MenuButton
						as={Button}
						variant="ghost"
						colorScheme="gray"
						size="sm"
						px={2}
					>
						<Avatar w={4} h={4} rounded="md" />
						<ChevronDownIcon
							color={useColorModeValue('gray.600', 'gray.500')}
						/>
					</MenuButton>
					<MenuList>
						<MenuItem>View profile</MenuItem>
						<MenuItem>View settings</MenuItem>
						<MenuDivider />
						<MenuItem onClick={toggleColorMode}>
							{colorMode === 'light' ? <MoonIcon mr={2} /> : <SunIcon mr={2} />}
							{colorMode === 'light' ? 'Dark' : 'Light'} mode
						</MenuItem>
						<MenuDivider />
						<MenuItem>Log out</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
			<MenuToggleButton toggle={toggle} />
		</Flex>
	);
};

export default SideBarHeader;
