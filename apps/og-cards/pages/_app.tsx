import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import customTheme from '@frontend/chakra-theme'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider theme={customTheme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default App
