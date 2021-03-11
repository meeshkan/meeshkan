import { transparentize, mode, GlobalStyleProps } from '@chakra-ui/theme-tools';

const customComponents = {
	Alert: {
		baseStyle: {
			container: {
				py: 4,
				pl: 4,
				pr: 6,
				rounded: 'lg',
				fontSize: '14px',
			},
			title: {
				fontWeight: 'bold',
				lineHeight: 'base',
				mb: 3,
			},
			description: {
				lineHeight: 'tall',
				fontStyle: 'italic',
			},
			icon: {
				mr: 4,
				w: 4,
				h: 4,
			},
		},
		variants: {
			clean: (props: GlobalStyleProps) => ({
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
			subtle: (props: GlobalStyleProps) => ({
				bg: mode(
					`${props.colorScheme}.50`,
					transparentize(`${props.colorScheme}.200`, 0.16)
				)(props),
				color: mode(
					`${props.colorScheme}.800`,
					`${props.colorScheme}.200`
				)(props),
				_hover: {
					bg: mode(
						`${props.colorScheme}.100`,
						transparentize(`${props.colorScheme}.200`, 0.1)
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
	Tooltip: {
		baseStyle: (props: GlobalStyleProps) => ({
			p: 3,
			lineHeight: '1.4',
			bg: mode('gray.700', 'gray.300')(props),
			color: mode('white', 'gray.900')(props),
			borderRadius: 'md',
			fontWeight: 'medium',
			fontSize: 'sm',
			boxShadow: 'md',
			maxW: '320px',
			zIndex: 'tooltip',
		}),
	},
};

export default customComponents;
