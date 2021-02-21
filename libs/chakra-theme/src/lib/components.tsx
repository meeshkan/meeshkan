import { transparentize, mode } from '@chakra-ui/theme-tools';

const customComponents = {
	Alert: {
		baseStyle: {
			container: {
				p: 4,
				rounded: 'lg',
				fontSize: '14px',
			},
			title: {
				fontWeight: 'bold',
				lineHeight: 'base',
				mb: 3,
			},
			description: {
				lineHeight: 'base',
				fontStyle: 'italic',
			},
			icon: {
				mr: 4,
				w: 4,
				h: 4,
			},
		},
		variants: {
			clean: (props) => ({
				container: { backgroundColor: mode(`white`, `gray.900`)(props) },
				icon: {
					color: mode(
						`${props.colorScheme}.500`,
						`${props.colorScheme}.300`
					)(props),
				},
			}),
		},
	},
	Button: {
		baseStyle: {
			borderRadius: 'md',
			fontWeight: 900,
			lineHeight: '1',
			minW: 'fit-content',
			_focus: {
				boxShadow: 'outline',
			},
			_disabled: {
				opacity: 0.4,
				cursor: 'not-allowed',
				boxShadow: 'none',
			},
			_hover: {
				textDecoration: 'none',
				_disabled: {
					bg: 'initial',
				},
			},
		},
		variants: {
			subtle: (props) => ({
				bg: mode(
					`${props.colorScheme}.50`,
					transparentize(`${props.colorScheme}.500`, 0.2)
				)(props),
				color: mode(
					`${props.colorScheme}.700`,
					`${props.colorScheme}.200`
				)(props),
				_hover: {
					bg: mode(
						`${props.colorScheme}.100`,
						transparentize(`${props.colorScheme}.500`, 0.1)
					)(props),
				},
				_active: {
					bg: mode(
						`${props.colorScheme}.200`,
						`${props.colorScheme}.900`
					)(props),
				},
			}),
		},
		defaultProps: {
			colorScheme: 'blue',
		},
	},
	Text: {
		baseStyle: {
			fontSize: '16px',
			lineHeight: '1.6',
			fontFamily: 'body',
		},
	},
};

export default customComponents;
