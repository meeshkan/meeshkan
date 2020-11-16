import React from 'react'
import { Flex, useColorModeValue } from '@chakra-ui/core'
import './layout.module.css'

const Layout = ({ children, ...props }) => {
    return (
        <Flex
            p={[0, 8, 8, 8]}
            w="100%"
            bg={useColorModeValue('gray.100', 'gray.900')}
            h="100vh"
            direction={['column', 'row', 'row', 'row']}
            {...props}
        >
            {children}
        </Flex>
    )
}

export default Layout
