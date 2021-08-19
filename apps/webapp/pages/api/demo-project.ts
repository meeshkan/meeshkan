import { ProjectUpdateInput } from '@frontend/meeshkan-types';
import {
	CONFIGURATION_UPDATE_LOGIN_FLOW,
	CREATE_DEMO_PROJECT,
	LINK_DEMO_PROJECT_TO_TEST_RUNS,
} from 'apps/webapp/graphql/demo';
import { eightBaseClient } from 'apps/webapp/utils/graphql';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { idToken, userId } = req.body;
	const client = eightBaseClient(idToken);
	const response = await client.request(CREATE_DEMO_PROJECT, { id: userId, name: `My ${choose(POSITIVE_ADJECTIVES)} Lego Demo Project` });

	const projectId = response.projectCreate.id;
	const userStories: Array<{ id: string; title: string }> =
		response.projectCreate.userStories.items;
	const data: ProjectUpdateInput = {
		release: {
			create: [
				{
					testRuns: {
						create: [
							{
								status: 'completed',
								testLength: '00:23:01',
								testOutcome: {
									create: userStories.map(({ title, id }) =>
										title === 'Get help'
											? {
													isResolved: false,
													status: 'failing',
													video: {
														connect: { fileId: 'P3igyO0QSpKk7scoO77H' },
													},
													errorStepIndex: 15,
													userStory: {
														connect: {
															id,
														},
													},
											  }
											: title === 'VIP Corner'
											? {
													isResolved: false,
													status: 'failing',
													video: {
														connect: { fileId: 'OjrwQOWySUKSAkMcxvfN' },
													},
													errorStepIndex: 15,
													errorMessage:
														'Assertion error: User should have retained VIP status.',
													userStory: {
														connect: {
															id,
														},
													},
											  }
											: {
													isResolved: false,
													status: 'passing',
													userStory: {
														connect: {
															id,
														},
													},
											  }
									),
								},
							},
						],
					},
				},
			],
		},
	};
	await client.request(LINK_DEMO_PROJECT_TO_TEST_RUNS, { id: projectId, data });
	const flowId = userStories.filter(({ title }) => title === "Log in flow")[0].id;
  await client.request(CONFIGURATION_UPDATE_LOGIN_FLOW, { id: response.projectCreate.configuration.id, flow: flowId});
	res.json({ project: response.projectCreate });
};

const POSITIVE_ADJECTIVES = [
	'Abundant',
	'Accountable',
	'Active',
	'Adaptable',
	'Adventurous',
	'Affable',
	'Affectionate',
	'Agile',
	'Agreeable',
	'Alert',
	'Altruistic',
	'Amazing',
	'Ambitious',
	'Amiable',
	'Amicable',
	'Amusing',
	'Animated',
	'Artful',
	'Assertive',
	'Astute',
	'Athletic',
	'Attentive',
	'Attractive',
	'Authentic',
	'Balanced',
	'Beautiful',
	'Believer',
	'Blissful',
	'Bold',
	'Brave',
	'Bright',
	'Brilliant',
	'Broadminded',
	'Calm',
	'Candid',
	'Capable',
	'Careful',
	'Caring',
	'Celebrated',
	'Centered',
	'Champion',
	'Charismatic',
	'Charitable',
	'Charming',
	'Chatty',
	'Cheeky',
	'Cheerful',
	'Cheery',
	'Cherished',
	'Chic',
	'Chilled',
	'Chivalrous',
	'Civil',
	'Clean',
	'Communicator',
	'Compassionate',
	'Competent',
	'Confident',
	'Conscientious',
	'Considerate',
	'Consistent',
	'Content',
	'Controlled',
	'Cooperative',
	'Courageous',
	'Courteous',
	'Crafty',
	'Creative',
	'Curious',
	'Cute',
	'Dear',
	'Decisive',
	'Decisive',
	'Delightful',
	'Determined',
	'Devoted',
	'Diligent',
	'Diplomatic',
	'Discreet',
	'Driven',
	'Eager',
	'Earnest',
	'Effusive',
	'Emotional',
	'Empathetic',
	'Empathic',
	'Empowered',
	'Empowering',
	'Endearing',
	'Energetic',
	'Enlightened',
	'Enlivened',
	'Enough',
	'Enterprising',
	'Entertaining',
	'Enthusiastic',
	'Entrepreneurial',
	'Ethical',
	'Euphoric',
	'Exuberant',
	'Exotic',
	'Experienced',
	'Expert',
	'Fabulous',
	'Fair',
	'Faithful',
	'Famous',
	'Fantastic',
	'Fascinating',
	'Fastidious',
	'Fearless',
	'Fit',
	'Flexible',
	'Flowing',
	'Focused',
	'Frank',
	'Free',
	'Friendly',
	'Fun',
	'Funny',
	'Game',
	'Generous',
	'Genius',
	'Gentle',
	'Genuine',
	'Giving',
	'Glamor',
	'Glamorous',
	'Glowing',
	'Good',
	'Graceful',
	'Gracious',
	'Grateful',
	'Great',
	'Gregarious',
	'Handsome',
	'Happy',
	'Healthy',
	'Heartful',
	'Heartwarming',
	'Helpful',
	'Honest',
	'Hopeful',
	'Humble',
	'Humorous',
	'Hysterical',
	'Idealistic',
	'Illuminated',
	'Imaginative',
	'Impartial',
	'Inciteful',
	'Incomparable',
	'Incredible',
	'Independent',
	'Industrious',
	'Ineffable',
	'Ingenios',
	'Innovative',
	'Inspirational',
	'Inspiring',
	'Integral',
	'Intellectual',
	'Intelligent',
	'Intentional',
	'Interesting',
	'Intuitive',
	'Inventive',
	'Invigorated',
	'Involved',
	'Irresistible',
	'Jolly',
	'Jovial',
	'Joyful',
	'Joyous',
	'Jubilant',
	'Just',
	'Justified',
	'Keen',
	'Kind',
	'Knowledgeable',
	'Lithe',
	'Lively',
	'Living',
	'Loud',
	'Lovable',
	'Loved',
	'Lovely',
	'Loving',
	'Loyal',
	'Lucky',
	'Lustful',
	'Luxurious',
	'Magical',
	'Magnanimous',
	'Magnificient',
	'Marvelous',
	'Masterful',
	'Mediator',
	'Methodical',
	'Meticulous',
	'Mindful',
	'Miraculous',
	'Modest',
	'Motivated',
	'Motivational',
	'Natural',
	'Neat',
	'Neutral',
	'Nurturing',
	'Obliging',
	'Open',
	'Optimistic',
	'Opulent',
	'Orderly',
	'Organized',
	'Original',
	'Outgoing',
	'Outstanding',
	'Passionate',
	'Patient',
	'Peaceful',
	'Perfect',
	'Perk',
	'Perky',
	'Persistent',
	'Philosophical',
	'Pioneering',
	'Placid',
	'Playful',
	'Pleasant',
	'Poised',
	'Polite',
	'Positive',
	'Powerful',
	'Practical',
	'Precious',
	'Pretty',
	'Proactive',
	'Prosperous',
	'Provocative',
	'Punctual',
	'Quick',
	'Quiet',
	'Radiant',
	'Rational',
	'Ready',
	'Realistic',
	'Receptive',
	'Refreshed',
	'Relatable',
	'Relaxed',
	'Reliable',
	'Relieved',
	'Remarkable',
	'Reserved',
	'Resilient',
	'Resourceful',
	'Respected',
	'Revered',
	'Rich',
	'Romantic',
	'Sacred',
	'Safe',
	'Satisfied',
	'Scrumptious',
	'Secure',
	'Sensational',
	'Sensible',
	'Sensitive',
	'Serene',
	'Serent',
	'Sharp',
	'Shimmering',
	'Shining',
	'Shrewd',
	'Simple',
	'Sincere',
	'Skilled',
	'Smart',
	'Snazzy',
	'Sociable',
	'Soulful',
	'Special',
	'Spectacular',
	'Splendid',
	'Stellar',
	'Stellar',
	'Stoic',
	'Straightforward',
	'Strategic',
	'Striking',
	'Strong',
	'Studious',
	'Stunning',
	'Successful',
	'Super',
	'Sustained',
	'Sweet',
	'Sympathetic',
	'Tactful',
	'Talented',
	'Tasty',
	'Thankful',
	'Thorough',
	'Thoughtful',
	'Thrilled',
	'Thriving',
	'Tidy',
	'Tolerant',
	'Tough',
	'Tranquil',
	'Transparent',
	'Triumphant',
	'Trusting',
	'Trusty',
	'Ultimate',
	'Unassuming',
	'Unbelievable',
	'Understanding',
	'Unique',
	'Unlimited',
	'Unreal',
	'Upbeat',
	'Uplifted',
	'Uplifting',
	'Valuable',
	'Versatile',
	'Versatile',
	'Vibrant',
	'Victorious',
	'Virtuous',
	'Vivacious',
	'Warm',
	'Warmhearted',
	'Wealthy',
	'Welcoming',
	'Whole',
	'Willing',
	'Wise',
	'Witty',
	'Wonderful',
	'Wondrous',
	'Worthy',
	'Yielding',
	'Yummy',
	'Zappy',
	'Zealous',
	'Zestful',
	'Zing',
	'Adventurous',
	'Affable',
	'Affectionate',
	'Agreeable',
	'Alluring',
	'Angelic',
	'Attractive',
	'Beautiful',
	'Blessing',
	'Breathtaking',
	'Careful',
	'Champion',
	'Charismatic',
	'Charming',
	'Classy',
	'Confident',
	'Courageous',
	'Cuddly',
	'Cute',
	'Delectable',
	'Electric',
	'Enchanting',
	'Energetic',
	'Exceptional',
	'Exciting',
	'Fabulous',
	'Fascinating',
	'Foxy',
	'Funny',
	'Genuine',
	'Gorgeous',
	'Handsome',
	'Hilarious',
	'Kind',
	'Loving',
	'Magnificent',
	'Passionate',
	'Perfect',
	'Precious',
	'Pretty',
	'Safe',
	'Secure',
	'Sexy',
	'Sharing',
	'Soulmate',
	'Stalwart',
	'Sturdy',
	'Sweet',
	'Adventurous',
	'Agreeable',
	'Amusing',
	'Believer',
	'Brave',
	'Calm',
	'Candid',
	'Caring',
	'Centred',
	'Challenging',
	'Champion',
	'Cheeky',
	'Clever',
	'Communicator',
	'Consistent',
	'Creative',
	'Entertaining',
	'Friendly',
	'Funny',
	'Generous',
	'Genuine',
	'Honest',
	'Inspiring',
	'Kind',
	'Listener',
	'Loving',
	'Loyal',
	'Openminded',
	'Supportive',
	'Thoughtful',
	'Trustworthy',
	'Trusty',
	'Admirable',
	'Adventurous',
	'Ambitious',
	'Assuring',
	'Beautiful',
	'Bold',
	'Brave',
	'Bright',
	'Champion',
	'Cheerful',
	'Cheery',
	'Comforting',
	'Committed',
	'Compassionate',
	'Confident',
	'Courageous',
	'Courteous',
	'Dedicated',
	'Determined',
	'Driven',
	'Empowering',
	'Encouraging',
	'Energetic',
	'Enthusiastic',
	'Excellent',
	'Faithful',
	'Focused',
	'Forgiving',
	'Friendly',
	'Fun',
	'Gentle',
	'Great',
	'Happy',
	'Helpful',
	'Honest',
	'Hopeful',
	'Humble',
	'Imaginative',
	'Intelligent',
	'Kind',
	'Loving',
	'Loyal',
	'Motivating',
	'Nurturing',
	'Positive',
	'Powerful',
	'Reassuring',
	'Smart',
	'Steady',
	'Strong',
	'Trustworthy',
	'Trusty',
	'Valued',
	'Wilful',
	'Wise',
	'Agile',
	'Agreeable',
	'Ambitious',
	'Amusing',
	'Astute',
	'Attentive',
	'Bold',
	'Brave',
	'Calm',
	'Caring',
	'Competent',
	'Competent',
	'Conscientious',
	'Creative',
	'Diplomatic',
	'Engaged',
	'Genuine',
	'Graceful',
	'Intelligent',
	'Kind',
	'Loyal',
	'Smart',
	'Smart',
	'Thinker',
	'Thorough',
	'Thoughtful',
	'Abundant',
	'Accountable',
	'Active',
	'Adaptable',
	'Adventurous',
	'Affable',
	'Affectionate',
	'Agreeable',
	'Amazing',
	'Ambitious',
	'Amiable',
	'Amicable',
	'Amusing',
	'Animated',
	'Assertive',
	'Astute',
	'Attentive',
	'Attractive',
	'Authentic',
	'Balanced',
	'Beautiful',
	'Bold',
	'Brave',
	'Bright',
	'Brilliant',
	'Calm',
	'Capable',
	'Caring',
	'Centred',
	'Charismatic',
	'Charitable',
	'Charming',
	'Cheerful',
	'Cheery',
	'Chilled',
	'Compassionate',
	'Confidant',
	'Confident',
	'Considerate',
	'Controlled',
	'Cool',
	'Crafty',
	'Creative',
	'Cute',
	'Dear',
	'Delightful',
	'Determined',
	'Devoted',
	'Diligent',
	'Diplomatic',
	'Discreet',
	'Driven',
	'Eager',
	'Empathetic',
	'Empowered',
	'Enchanting',
	'Encouraging',
	'Endearing',
	'Energetic',
	'Enough',
	'Entertaining',
	'Enthusiastic',
	'Ethical',
	'Exotic',
	'Expert',
	'Fabulous',
	'Fair',
	'Faithful',
	'Fascinating',
	'Fearless',
	'Fit',
	'Flexible',
	'Focused',
	'Frank',
	'Friend',
	'Friendly',
	'Fun',
	'Funny',
	'Game',
	'Generous',
	'Genius',
	'Gentle',
	'Genuine',
	'Giving',
	'Glamorous',
	'Good',
	'Graceful',
	'Gracious',
	'Grateful',
	'Great',
	'Happy',
	'Hardworking',
	'Healthy',
	'Helpful',
	'Honest',
	'Hopeful',
	'Humble',
	'Incredible',
	'Independent',
	'Innovative',
	'Inspiring',
	'Interesting',
	'Intuitive',
	'Inventive',
	'Involved',
	'Jolly',
	'Jovial',
	'Joyful',
	'Joyous',
	'Just',
	'Keen',
	'Kind',
	'Lively',
	'Lovable',
	'Loving',
	'Loyal',
	'Lucky',
	'Magical',
	'Magnificent',
	'Mindful',
	'Miraculous',
	'Modest',
	'Motivated',
	'Natural',
	'Neat',
	'Nice',
	'Nurturing',
	'Open',
	'Optimistic',
	'Organized',
	'Original',
	'Outgoing',
	'Outstanding',
	'Passionate',
	'Patient',
	'Peaceful',
	'Perfect',
	'Perky',
	'Persistent',
	'Playful',
	'Pleasant',
	'Polite',
	'Positive',
	'Powerful',
	'Practical',
	'Precious',
	'Pretty',
	'Proactive',
	'Prosperous',
	'Punctual',
	'Quick',
	'Radiant',
	'Rational',
	'Ready',
	'Realistic',
	'Receptive',
	'Relatable',
	'Relaxed',
	'Reliable',
	'Resilient',
	'Resourceful',
	'Respected',
	'Rich',
	'Romantic',
	'Sacred',
	'Safe',
	'Secure',
	'Sensible',
	'Sharp',
	'Shimmering',
	'Shining',
	'Smart',
	'Sociable',
	'Soulful',
	'Special',
	'Spectacular',
	'Stellar',
	'Straightforward',
	'Striking',
	'Strong',
	'Studious',
	'Stunning',
	'Successful',
	'Super',
	'Sweet',
	'Sympathetic',
	'Talented',
	'Thoughtful',
	'Tidy',
	'Tolerant',
	'Tough',
	'Tranquil',
	'Trusting',
	'Trusty',
	'Understanding',
	'Unique',
	'Upbeat',
	'Uplifting',
	'Valuable',
	'Victorious',
	'Virtuous',
	'Vivacious',
	'Warm',
	'Welcoming',
	'Whole',
	'Willing',
	'Wise',
	'Witty',
	'Wonderful',
	'Worthy',
];
const choose = <T>(choices: Array<T>) => choices[Math.floor(Math.random() * choices.length)];
