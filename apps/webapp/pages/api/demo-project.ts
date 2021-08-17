import { ProjectUpdateInput } from '@frontend/meeshkan-types';
import {
	CREATE_DEMO_PROJECT,
	LINK_DEMO_PROJECT_TO_TEST_RUNS,
} from 'apps/webapp/graphql/demo';
import { eightBaseClient } from 'apps/webapp/utils/graphql';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { idToken, userId } = req.body;
	const client = eightBaseClient(idToken);
	const response = await client.request(CREATE_DEMO_PROJECT, { id: userId });

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

	res.json({ projectId });
};
