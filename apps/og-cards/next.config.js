module.exports = {
	env: {
		CARD_WIDTH: 800,
		CARD_HEIGHT: 450,
		TITLE_PLACEHOLDER: 'Profunctors are everywhere!',
	},
	devIndicators: {
		autoPrerender: false,
	},
	async rewrites() {
		return [
			{
				source: '/image/:url',
				destination: '/api/:url',
			},
		]
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: 'https://github.com/meeshkan/og-cards',
				permanent: true,
			},
		]
	},
}
