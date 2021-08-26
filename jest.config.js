const { getJestProjects } = require('@nrwl/jest');

module.exports = {
	preset: 'jest-puppeteer',
	projects: getJestProjects(),
};
