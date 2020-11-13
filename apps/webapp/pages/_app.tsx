import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/core'
import customTheme from '@frontend/chakra-theme'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Meeshkan Webapp</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp;
