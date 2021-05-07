const globalStyles = {
	global: (props) => ({
		"html, body": {
			scrollBehavior: "smooth",
			backgroundColor: props.colorMode === "dark" ? "gray.900" : "white",
			color: props.colorMode === "dark" ? "gray.300" : "gray.700",
			webkitFontSmoothing: "antialiased",
			fontSmoothing: "always",
		},
		"h1,h2,h3,h4,h5,h6": {
			color: props.colorMode === "dark" ? "white" : "gray.900",
		},
		_selection: {
			color: "rgba(220, 24, 83, 1)",
			background: "rgba(220, 24, 83, 0.1)",
		},
	}),
}

export default globalStyles
