import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import customTheme from "./theme/theme"
import Prism from "prism-react-renderer/prism"
;(typeof global !== "undefined" ? global : window).Prism = Prism
require("prismjs/components/prism-haskell")
require("prismjs/components/prism-scheme")
require("prismjs/components/prism-latex")

export const wrapRootElement = ({ element }) => {
	return <ChakraProvider theme={customTheme}>{element}</ChakraProvider>
}
