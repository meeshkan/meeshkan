import {
    Stack,
    Box,
    Flex,
    Spacer,
    Button,
    IconButton,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    Select,
    Divider,
} from '@chakra-ui/core'
import {
    ChevronDownIcon,
    ArrowUpDownIcon,
    ChatIcon,
} from '@chakra-ui/icons'
import ColorModeButton from './color-mode-button'
import {
    LogoIcon,
    InboxIcon,
    ActivityIcon,
    VideoIcon,
    CheckSquareIcon,
    PackageIcon,
    SettingsIcon,
} from '@frontend/chakra-theme'

const NavButton = (props) => {
    return (
        <Button
            size="sm"
            variant="ghost"
            colorScheme="black"
            width="100%"
            justifyContent="flex-start"
            alignItems="center"
            {...props}
        />
    )
}

const SideBar = (props) => {
    return (
        <Stack
            as="nav"
            h="100%"
            bg={useColorModeValue('gray.200', 'gray.800')}
            w="100%"
            maxW={['100%', '256px', '256px', '256px']}
            h={['100vh', '100%', '100%', '100%']}
            rounded="lg"
            p={4}
            {...props}
        >
            <Flex direction="column" h="full">
                <Flex align="center">
                    <Box>
                        <LogoIcon
                            width="120px"
                            height="25px"
                        />
                    </Box>
                    <Spacer />
                    <Flex align="center">
                        <IconButton
                            variant="ghost"
                            size="sm"
                            icon={<InboxIcon w={4} h={4} />}
                            color={useColorModeValue('gray.600', 'gray.500')}
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            px={2}
                        >
                            <Avatar
                                w={4} h={4}
                                rounded="md"
                            />
                            <ChevronDownIcon
                                color={useColorModeValue('gray.600', 'gray.500')}
                            />
                        </Button>
                    </Flex>
                </Flex>
                <Stack mt={6}>
                    <NavButton
                        isActive
                        leftIcon={<ActivityIcon />}
                    >
                        Health dashboard
                    </NavButton>
                    <NavButton
                        leftIcon={<VideoIcon />}
                    >
                        User flows
                    </NavButton>
                    <NavButton
                        leftIcon={<CheckSquareIcon />}
                    >
                        Test cases
                    </NavButton>
                    <NavButton
                        leftIcon={<PackageIcon />}
                    >
                        Releases
                    </NavButton>
                </Stack>
                <Spacer />
                <NavButton
                    leftIcon={<ChatIcon />}
                    mt={2}
                >
                    Help and Feedback
                </NavButton>
                <Divider my={5} />
                <Flex align="center" mb={3}>
                    <Select
                        placeholder="Acme Industries"
                        variant="outline"
                        rounded="md"
                        size="sm"
                    />
                    <IconButton
                        icon={<SettingsIcon color={useColorModeValue('gray.600', 'gray.500')} />}
                        variant="ghost"
                        size="sm"
                        ml={2}
                    />
                </Flex>
                <ColorModeButton />
            </Flex>
        </Stack>
    )
}

export default SideBar
