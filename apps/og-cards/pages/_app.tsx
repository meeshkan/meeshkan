import { ChakraProvider } from '@chakra-ui/core'
import { AppProps } from 'next/app'
import customTheme from '../theme'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider theme={customTheme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default App
