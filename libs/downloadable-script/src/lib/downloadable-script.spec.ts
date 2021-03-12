import { eightBaseToPptr } from './downloadable-script';

const script = {
	version: '1.0.0',
	groups: {
		count: 1,
		groups: [], // needed for type to check
		items: [
			{
				name: null,
				gIndex: 0,
				commands: {
					groups: [], // needed for type to check
					items: [
						{
							type: null,
							setViewportSize: null,
							sIndex: 0,
							open: { value: 'https://meeshkan.com/' },
							dragndrop: null,
							click: null,
						},
						{
							type: null,
							setViewportSize: { value: { yCoord: 985, xCoord: 1848 } },
							sIndex: 1,
							open: null,
							dragndrop: null,
							click: null,
						},
						{
							type: null,
							setViewportSize: null,
							sIndex: 2,
							open: null,
							dragndrop: null,
							click: {
								target: {
									selector: {
										xpath:
											'/html/body/div[1]/div[1]/footer/div/div[1]/div[1]/a[2]',
										tagName: 'A',
										tagId: '',
										selector:
											'.chakra-stack:nth-child(1) > .chakra-link:nth-child(3)',
										innerText: 'Careers',
										className: '.chakra-link.css-1bvdrhg',
									},
									coordinates: null,
								},
							},
						},
						{
							type: null,
							setViewportSize: null,
							sIndex: 3,
							open: null,
							dragndrop: {
								sourceTarget: {
									selector: {
										xpath: '/html',
										tagName: 'HTML',
										tagId: '',
										selector: 'html',
										innerText:
											'Blog\nProduct\nRoadmap\nLog...team | Meeshkan Website',
										className: '.js-focus-visible',
									},
									coordinates: { yCoord: 44, xCoord: 1836 },
								},
								destinationTarget: {
									selector: {
										xpath: '/html',
										tagName: 'HTML',
										tagId: '',
										selector: 'html',
										innerText:
											'Blog\nProduct\nRoadmap\nLog...team | Meeshkan Website',
										className: '.js-focus-visible',
									},
									coordinates: { yCoord: 44, xCoord: 1836 },
								},
							},
							click: null,
						},
					],
					count: 4,
				},
			},
		],
	},
};

describe('downloadableScript', () => {
	it('should work', () => {
		expect(eightBaseToPptr(script, { headless: false })).toEqual(
			'downloadable-script'
		);
	});
});
