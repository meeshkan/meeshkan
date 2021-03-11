import { GlobalStyleProps } from '@chakra-ui/theme-tools';

const globalStyles = {
	global: (props: GlobalStyleProps) => ({
		'html, body': {
			scrollBehavior: 'smooth',
			backgroundColor: props.colorMode === 'dark' ? 'gray.900' : 'white',
			color: props.colorMode === 'dark' ? 'gray.100' : 'gray.700',
			webkitFontSmoothing: 'antialiased',
			fontSmoothing: 'always',
			fontFeatureSettings: 'tnum',
		},
		_selection: {
			color: 'rgba(220, 24, 83, 1)',
			background: 'rgba(220, 24, 83, 0.1)',
		},
	}),
};

export default globalStyles;
