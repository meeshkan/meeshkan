import {
    Stack,
    Box,
    Flex,
    Spacer,
    IconButton,
    useColorModeValue,
    Select,
    Divider,
} from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import {
    ActivityIcon,
    VideoIcon,
    CheckSquareIcon,
    PackageIcon,
    SettingsIcon,
} from '@frontend/chakra-theme'
import ColorModeButton from '../molecules/color-mode-button'
import NavButton from '../molecules/nav-button'

const SideBarBody = () => {
    return (
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
                        aria-label="Settings"
                        icon={<SettingsIcon color={useColorModeValue('gray.600', 'gray.500')} />}
                        variant="ghost"
                        size="sm"
                        ml={2}
                    />
                </Flex>
                <ColorModeButton />
            </Box>
        </>
    )
}

export default SideBarBody
