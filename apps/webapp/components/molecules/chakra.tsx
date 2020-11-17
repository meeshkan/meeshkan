import { ReactNode } from 'react'
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react'

type ChakraProps = {
    cookies: string | undefined
    children: ReactNode
}

const Chakra = ({ cookies, children }: ChakraProps) => {
    const colorModeManager = typeof cookies === 'string'
        ? cookieStorageManager(cookies)
        : localStorageManager

    return (
        <ChakraProvider colorModeManager={colorModeManager}>
            {children}
        </ChakraProvider>
    )
}

export default Chakra

export const getServerSideProps = ({ req: request }) => {
    return {
        props: {
            cookies: request.headers.cookie ?? '',
        },
    }
}
