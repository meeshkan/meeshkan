import { Box, useColorModeValue } from '@chakra-ui/react'

const Card = (props) => {
    return (
        <Box
            p={4}
            rounded="lg"
			bg={useColorModeValue('white', 'gray.900')}
            {...props}
        />
    )
}

export default Card
