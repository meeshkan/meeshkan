import React, { useRef, useEffect } from "react"
import { makeWidget } from "@typeform/embed"
import { Box } from "@chakra-ui/react"

type TypeFormProps = {
	id: string
}

const TypeForm = ({ id }: TypeFormProps) => {
	const typeformRef = useRef(null)

	useEffect(() => {
		makeWidget(typeformRef.current, `https://form.typeform.com/to/${id}`, {
			hideFooter: true,
			hideHeaders: true,
			opacity: 0,
		})
	}, [typeformRef])

	return <Box ref={typeformRef} h="100vh" w="100%" />
}

export default TypeForm
