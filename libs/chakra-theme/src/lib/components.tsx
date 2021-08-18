import { transparentize, mode, GlobalStyleProps } from '@chakra-ui/theme-tools';

const customComponents = {
	Alert: {
		baseStyle: (props: GlobalStyleProps) => ({
			container: {
				p: 4,
				rounded: 'lg',
				fontSize: '14px',
				border: '1px solid',
				borderColor: mode(
					`${props.colorScheme}.200`,
					`${props.colorScheme}.300`
				)(props),
			},
			title: {
				fontWeight: 'bold',
				lineHeight: 'base',
				mb: 3,
				color: mode(
					`${props.colorScheme}.700`,
					`${props.colorScheme}.200`
				)(props),
			},
			description: {
				lineHeight: 'tall',
				fontStyle: 'italic',
				color: mode(
					`${props.colorScheme}.700`,
					`${props.colorScheme}.200`
				)(props),
			},
			icon: {
				mr: 4,
				w: 4,
				h: 4,
			},
		}),
		variants: {
			clean: (props: GlobalStyleProps) => ({
				container: {
					backgroundColor: mode(`white`, `gray.900`)(props),
					pr: 6,
				},
				title: {
					color: mode(`gray.900`, `white`)(props),
				},
				description: {
					color: mode(`gray.700`, `gray.200`)(props),
				},
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
	Checkbox: {
		parts: ['container', 'control', 'label', 'icon'],
		baseStyle: {
			control: {
				borderRadius: 'md',
			},
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
	Menu: {
		parts: ['list', 'item'],
		baseStyle: (props: GlobalStyleProps) => ({
			list: {
				bg: mode(`#fff`, `gray.700`)(props),
				boxShadow: mode(`sm`, `dark-lg`)(props),
				color: 'inherit',
				minW: '3xs',
				p: '2',
				zIndex: 1,
				borderRadius: 'md',
				borderWidth: '1px',
			},
			item: {
				py: '0.4rem',
				px: '0.8rem',
				transition: 'background 50ms ease-in 0s',
				borderRadius: 'md',
				_focus: {
					bg: mode(`gray.100`, `whiteAlpha.100`)(props),
				},
				_active: {
					bg: mode(`gray.200`, `whiteAlpha.200`)(props),
				},
				_expanded: {
					bg: mode(`gray.100`, `whiteAlpha.100`)(props),
				},
				_disabled: {
					opacity: 0.4,
					cursor: 'not-allowed',
				},
			},
		}),
	},
};

export default customComponents;
