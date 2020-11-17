import { Stack, useColorModeValue } from '@chakra-ui/core'
import './layout.module.css'

const Layout = ({ children, ...props }) => {
    return (
        <Stack
            p={[0, 8, 8, 8]}
            bg={useColorModeValue('gray.200', 'gray.900')}
            w="100%"
            h="100vh"
            d="flex"
            direction={['column', 'row', 'row', 'row']}
            spacing={[4, 8, 8, 8]}
            {...props}
        >
            {children}
        </Stack>
    )
}

export default Layout
