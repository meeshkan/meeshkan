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
    useMediaQuery,
} from '@chakra-ui/core'
import {
    ChevronDownIcon,
    ArrowUpDownIcon,
    ChatIcon,
} from '@chakra-ui/icons'
import { motion, useCycle } from 'framer-motion'
import {
    LogoIcon,
    InboxIcon,
    ActivityIcon,
    VideoIcon,
    CheckSquareIcon,
    PackageIcon,
    SettingsIcon,
} from '@frontend/chakra-theme'
import NavButton from './nav-button'
import ColorModeButton from './color-mode-button'
import MenuToggleButton from './menu-toggle-button'

const MotionStack = motion.custom(Stack)

const SideBar = (props) => {
    const [isOpen, toggleOpen] = useCycle(false, true)
    const [isMobile] = useMediaQuery('(max-width: 30em)')

    return (
        <MotionStack
            p={4}
            as="nav"
            rounded="lg"
            bg={useColorModeValue('gray.200', 'gray.800')}
            w="100%"
            maxW={['100%', '256px', '256px', '256px']}
            h={[isOpen ? '100vh' : 'auto', '100%', '100%', '100%']}
            animate={isOpen ? 'open' : 'closed'}
            initial={false}
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
                    <MenuToggleButton toggle={() => toggleOpen()} />
                </Flex>
                {(isOpen || !isMobile) && (
                    <>
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
                        <Box>
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
                        </Box>
                    </>
                )}
            </Flex>
        </MotionStack>
    )
}

export default SideBar
