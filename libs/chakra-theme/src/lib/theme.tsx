import { extendTheme } from '@chakra-ui/react';
import customColors from './colors';
import globalStyles from './global';
import customComponents from './components';
import { mode } from '@chakra-ui/theme-tools';

const customTheme = extendTheme({
	config: {
		useSystemColorMode: false,
		initialColorMode: 'light',
	},
	components: {
		...customComponents,
		Menu: {
			parts: ['item', 'list'],
			baseStyle: (props) => ({
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
			}),
		},
	},
	textStyles: {
		h1: {
			fontSize: ['3xl', '4xl', '5xl'],
			fontWeight: 900,
			letterSpacing: '0.025em',
			lineHeight: '1.2',
		},
		h2: {
			fontSize: ['2xl', '3xl', '4xl'],
			fontWeight: 900,
			lineHeight: '1.4',
		},
		h3: {
			fontSize: ['xl', '2xl', '3xl'],
			fontWeight: 800,
			lineHeight: '1.4',
		},
		h4: {
			fontSize: ['lg', 'xl', '2xl'],
			fontWeight: 700,
			lineHeight: '1.4',
		},
	},
	styles: {
		...globalStyles,
	},
	colors: {
		...customColors,
	},
	fonts: {
		body: `Inter, sans-serif`,
		heading: `Inter, sans-serif`,
		mono: 'Jet Brains Mono, Fira Code, monospace',
	},
	fontSizes: {
		xs: '8px',
		sm: '12px',
		md: '16px',
		lg: '18px',
		xl: '20px',
		'2xl': '24px',
		'3xl': '32px',
		'4xl': '40px',
		'5xl': '48px',
		'6xl': '64px',
	},
	fontWeights: {
		100: 100,
		200: 200,
		300: 300,
		400: 400,
		500: 500,
		600: 600,
		700: 700,
		800: 800,
		900: 900,
	},
	lineHeights: {
		tiny: '0.8',
		normal: 'normal',
		base: '1',
		shorter: '1.2',
		short: '1.4',
		tall: '1.6',
		taller: '2',
	},
	letterSpacings: {
		tighter: '-0.05em',
		tight: '-0.025em',
		normal: '0',
		wide: '0.025em',
		wider: '0.05em',
		widest: '0.1em',
	},
	space: {
		'0': '0',
		'1': '0.125rem',
		'2': '0.25rem',
		'3': '0.5rem',
		'4': '1rem',
		'5': '1.5rem',
		'6': '2rem',
		'8': '2.5em',
		'10': '3rem',
		'11': '3.5rem',
		'12': '4rem',
		'14': '5rem',
		'16': '6rem',
		'20': '8rem',
		'24': '11rem',
		'32': '16rem',
	},
});

export default customTheme;
