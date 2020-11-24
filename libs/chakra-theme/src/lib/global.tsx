const globalStyles = {
	global: (props) => ({
		'html, body': {
			scrollBehavior: 'smooth',
			backgroundColor: props.colorMode === 'dark' ? 'gray.900' : 'white',
			color: props.colorMode === 'dark' ? 'gray.100' : 'gray.700',
			webkitFontSmoothing: 'antialiased',
			fontSmoothing: 'always',
		},
		_selection: {
			color: 'rgba(220, 24, 83, 1)',
			background: 'rgba(220, 24, 83, 0.1)',
		},
	}),
};

export default globalStyles;
