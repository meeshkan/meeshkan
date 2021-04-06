import { useContext, useMemo } from 'react';
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
import Router from 'next/router';
import {
	LogoIcon,
	InboxIcon,
	MoonIcon,
	SunIcon,
	LogoutIcon,
} from '@frontend/chakra-theme';
import { ChevronDownIcon } from '@chakra-ui/icons';
import MenuToggleButton from '../molecules/menu-toggle-button';
import { UserContext } from '../../utils/user';
import { shutdown as shutdownIntercom } from '../../utils/intercom';
import Link from 'next/link';
import { createSlug } from '../../utils/createSlug';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';

type SideBarHeaderProps = {
	toggle: (i?: number) => void;
};

const SideBarHeader = ({ toggle }: SideBarHeaderProps) => {
	const { avatar, name, project } = useContext(UserContext);
	const { colorMode, toggleColorMode } = useColorMode();
	const mixpanel = useAnalytics();
	const inboxIconColor = useColorModeValue('gray.500', 'gray.400');
	const chevronIconColor = useColorModeValue('gray.600', 'gray.500');

	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project,
	]);

	const handleLogoutClick = () => {
		mixpanel.track('Log out');
		Router.push('/api/logout');
		shutdownIntercom();
	};

	return (
		<Flex align="center">
			<Box>
				<Link href={`/${slugifiedProjectName}`} passHref>
					<a>
						<LogoIcon width="auto" height={6} />
					</a>
				</Link>
			</Box>
			<Spacer />
			<Flex align="center">
				<IconButton
					disabled={true}
					aria-label="Inbox"
					variant="ghost"
					size="sm"
					icon={<InboxIcon w={4} h={4} />}
					color={inboxIconColor}
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
						<Avatar
							name={name}
							src={avatar && avatar}
							size="2xs"
							borderRadius="md"
							backgroundColor="transparent"
						/>
						<ChevronDownIcon color={chevronIconColor} />
					</MenuButton>
					<MenuList>
						<MenuItem>
							<Link href={`/${slugifiedProjectName}/settings`} passHref>
								<a>View settings</a>
							</Link>
						</MenuItem>
						<MenuDivider />
						<MenuItem
							onClick={() => {
								toggleColorMode();
								mixpanel.track('Toggle color mode');
							}}
						>
							{colorMode === 'light' ? <MoonIcon mr={3} /> : <SunIcon mr={3} />}
							{colorMode === 'light' ? 'Dark' : 'Light'} mode
						</MenuItem>
						<MenuDivider />
						<MenuItem onClick={handleLogoutClick}>
							{' '}
							<LogoutIcon mr={3} /> Log out
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
			<MenuToggleButton toggle={toggle} />
		</Flex>
	);
};

export default SideBarHeader;
