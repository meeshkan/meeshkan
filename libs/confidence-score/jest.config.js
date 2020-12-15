module.exports = {
	displayName: 'confidence-score',
	preset: '../../jest.preset.js',
	transform: {
		'^.+\\.[tj]sx?$': [
			'babel-jest',
			{ cwd: __dirname, configFile: './babel-jest.config.json' },
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/libs/confidence-score',
};
