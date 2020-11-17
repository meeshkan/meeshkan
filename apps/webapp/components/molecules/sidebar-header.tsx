import {
    Box,
    Flex,
    Spacer,
    Button,
    IconButton,
    useColorModeValue,
    Avatar,
} from '@chakra-ui/react'
import {
    LogoIcon,
    InboxIcon,
} from '@frontend/chakra-theme'
import { ChevronDownIcon } from '@chakra-ui/icons'
import MenuToggleButton from '../molecules/menu-toggle-button'

const SideBarHeader = ({ toggle }) => {
    return (
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
                    aria-label="Inbox"
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
            <MenuToggleButton toggle={toggle} />
        </Flex>
    )
}

export default SideBarHeader
