import React from "react"
import { Image, useColorModeValue } from "@chakra-ui/react"

export const VimodjiLogo = () => {
	return (
		<>
			<Image
				src={useColorModeValue(
					"https://media.graphcms.com/nRqMGsLzQ6GNUG4t3m0g",
					"https://media.graphcms.com/9ArIG8UhSPOoarwXTu6A"
				)}
				h="32px"
			/>
		</>
	)
}
