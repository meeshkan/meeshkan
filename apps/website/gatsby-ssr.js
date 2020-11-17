import React from "react"
import { ColorModeScript } from "@chakra-ui/react"
import customTheme from "./theme/theme"
export { wrapPageElement, wrapRootElement } from "./gatsby-browser"

export const onRenderBody = ({ setPreBodyComponents }) => {
	setPreBodyComponents([
		<ColorModeScript
			// initialColorMode={customTheme.config.initialColorMode}
			initialColorMode="light"
			key="chakra-ui-no-flash"
		/>,
	])
}
