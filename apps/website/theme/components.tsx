const customComponents = {
	Alert: {
		baseStyle: {
			container: {
				px: 4,
				py: 3,
				rounded: "md",
				fontStyle: "italic"
			},
			title: {
				fontWeight: "bold",
				lineHeight: 6,
				mr: 2,
			},
			description: {
				lineHeight: 6,
			},
			icon: {
				mr: 3,
				w: 5,
				h: 6,
			},
		},
	},
	Button: {
		baseStyle: {
			borderRadius: "md",
			fontWeight: 900,
			lineHeight: "1.2",
			minW: "fit-content",
			_focus: {
				boxShadow: "outline",
			},
			_disabled: {
				opacity: 0.4,
				cursor: "not-allowed",
				boxShadow: "none",
			},
			_hover: {
				textDecoration: "none",
				_disabled: {
					bg: "initial",
				},
			},
		},
		defaultProps: {
			colorScheme: "blue",
		},
	},
	Text: {
		baseStyle: {
			fontSize: "16px",
			lineHeight: "1.6",
			fontFamily: "body",
		},
	},
}

export default customComponents
