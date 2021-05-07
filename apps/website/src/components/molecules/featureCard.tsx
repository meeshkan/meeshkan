import React from "react"
import { Stack } from "@chakra-ui/react"
import { Card } from "../atoms/card"

type FeatureProps = {
	children: Object
}

const FeatureCard = ({ children }: FeatureProps) => {
	return (
		<Card shadow padding={4}>
			<Stack isInline spacing={4} align="center" h="100%">
				{children}
			</Stack>
		</Card>
	)
}

export default FeatureCard
