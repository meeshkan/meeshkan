import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Stack, Wrap, Code, WrapItem, Flex } from '@chakra-ui/layout';
import {
	Input,
	Textarea,
	Checkbox,
	Select,
	Avatar,
	Button,
	useColorModeValue,
	useClipboard,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Heading,
	Divider,
	MenuDivider,
	Box,
} from '@chakra-ui/react';
import {
	CopyIcon,
	CrumpledPaperIcon,
	DownloadIcon,
	TrashIcon,
} from '@frontend/chakra-theme';
import {
	updateTitle,
	updateDescription,
	updateSignificance,
	updateRequiresAuthentication,
	onDelete,
	handleDownload,
} from '../../../utils/user-story-helpers';
import { UserStory } from '@frontend/meeshkan-types';
import { UserContext } from '../../../utils/user';
import { createSlug } from '../../../utils/createSlug';
import { useToaster } from '../../../hooks/use-toaster';
import RecentActivityCard from '../recent-activity';
import { TriggerTestRun } from 'apps/webapp/utils/test-triggers';
import { useRouter } from 'next/router';
import { useAnalytics } from '@lightspeed/react-mixpanel-script';

type DetailsFormProps = {
	userStory: UserStory;
};

export const DetailsForm = ({ userStory }: DetailsFormProps) => {
	const { project, idToken } = useContext(UserContext);
	const slugifiedProjectName = useMemo(() => createSlug(project?.name || ''), [
		project?.name,
	]);
	const [deleting, setDeleting] = useState(false);
	const toaster = useToaster();
	const router = useRouter();
	const mixpanel = useAnalytics();

	const menuBackground = useColorModeValue('white', 'gray.900');
	const formLabelColor = useColorModeValue('gray.500', 'gray.400');
	const deleteBackground = useColorModeValue(
		'red.50',
		'rgba(245, 163, 188, 0.16)'
	);
	const deleteText = useColorModeValue('red.800', 'red.200');

	const slugifiedStoryName = createSlug(userStory?.title);

	const { hasCopied, onCopy: handleCopy } = useClipboard(window?.location.href);
	useEffect(() => {
		if (hasCopied) {
			toaster({
				status: 'success',
				title: 'User story link copied!',
				description:
					'The URL of this user story has been copied to your clipboard.',
			});
		}
	}, [hasCopied, toaster]);

	return (
		<>
			<Flex justify="space-between">
				<Heading
					as="h2"
					d="flex"
					alignItems="center"
					fontSize="lg"
					fontWeight="800"
					lineHeight="short"
				>
					Test case details
				</Heading>
				<Menu placement="bottom-end">
					<MenuButton
						as={Button}
						size="sm"
						variant="outline"
						rightIcon={<ChevronDownIcon />}
					>
						Actions
					</MenuButton>
					<MenuList backgroundColor={menuBackground}>
						<MenuItem icon={<CopyIcon />} onClick={() => handleCopy()}>
							Copy share link
						</MenuItem>
						<MenuItem
							icon={<DownloadIcon />}
							onClick={async () => {
								const download = await handleDownload({
									scriptCommands: userStory?.scriptCommands,
									authenticationTokens:
										project?.configuration?.authenticationTokens?.items,
									stagingURL: project?.configuration?.stagingURL,
									slugifiedStoryName,
								});
								download === 'error'
									? toaster({
											status: 'error',
											title: 'Your test case could not be generated.',
											description: 'Please try again in a few seconds.',
									  })
									: null;
								mixpanel.track('Puppeteer script downloaded');
							}}
						>
							Download manual script
						</MenuItem>
						<MenuItem icon={<CrumpledPaperIcon />} isDisabled>
							Merge test case
						</MenuItem>

						<MenuDivider />

						<MenuItem
							icon={<TrashIcon />}
							id="delete-recording"
							_hover={{ backgroundColor: deleteBackground, color: deleteText }}
							onClick={() => {
								mixpanel.track('Delete a user story');
								const toasterId = 'deleting';
								toaster({
									status: 'info',
									title: 'Deleting this test case...',
									id: toasterId,
								});
								onDelete({
									deleting,
									setDeleting,
									userStoryId: userStory?.id,
									idToken,
								});
								toaster.close(toasterId);
								toaster({
									status: 'success',
									title: 'A test case has been deleted.',
									description: 'This test case is no longer accessible.',
								});

								router.push(`/${slugifiedProjectName}/user-stories`);
							}}
							isLoading={deleting}
						>
							Delete test case
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
			<Divider mt={1} mb={4} />

			<Stack spacing={6}>
				<FormControl>
					<FormLabel
						htmlFor="title"
						textTransform="uppercase"
						color={formLabelColor}
						fontSize="sm"
					>
						Title
					</FormLabel>
					<Input
						defaultValue={userStory?.title}
						// Callback invoked when user confirms value with `enter` key or by blurring input.
						onBlur={(e) => updateTitle(e.target.value, userStory?.id, idToken)}
						size="sm"
						borderRadius="md"
						id="title"
						placeholder="User story default title"
					/>
				</FormControl>

				<FormControl>
					<FormLabel
						htmlFor="description"
						textTransform="uppercase"
						color={formLabelColor}
						fontSize="sm"
					>
						Description
					</FormLabel>
					<Textarea
						defaultValue={userStory?.description}
						onBlur={(e) => {
							updateDescription(e.target.value, userStory?.id, idToken);
						}}
						size="sm"
						borderRadius="md"
						id="description"
						resize="vertical"
						placeholder="Use this field to communicate what this test should do."
					/>
				</FormControl>
				<FormControl>
					<FormLabel
						textTransform="uppercase"
						color={formLabelColor}
						fontSize="sm"
					>
						Tags
					</FormLabel>
					<Wrap>
						<Code
							p={2}
							borderRadius="md"
							d="flex"
							alignItems="center"
							maxW="fit-content"
							fontWeight="500"
						>
							<Checkbox
								size="sm"
								colorScheme="gray"
								white-space="nowrap"
								defaultChecked={userStory?.requiresAuthentication}
								onChange={() => {
									updateRequiresAuthentication(
										!userStory?.requiresAuthentication,
										userStory?.id,
										idToken
									);
								}}
							>
								requires authentication
							</Checkbox>
						</Code>
						<WrapItem>
							<Code p={2} borderRadius="md" fontWeight="500">
								test case
							</Code>
						</WrapItem>
						<WrapItem>
							<Code p={2} borderRadius="md" fontWeight="500">
								user generated
							</Code>
						</WrapItem>
						<WrapItem>
							<Code p={2} borderRadius="md" fontWeight="500">
								expected behavior
							</Code>
						</WrapItem>
					</Wrap>
				</FormControl>
				<FormControl>
					<FormLabel
						textTransform="uppercase"
						color={formLabelColor}
						fontSize="sm"
					>
						Significance
					</FormLabel>
					<Select
						icon={<ChevronDownIcon fill="gray.500" />}
						defaultValue={userStory?.significance}
						size="sm"
						borderRadius="md"
						textOverflow="ellipsis"
						overflow="hidden"
						whiteSpace="nowrap"
						onChange={(e) =>
							updateSignificance(e.target.value, userStory?.id, idToken)
						}
						w="full"
					>
						<option value="low">Low significance</option>
						<option value="medium">Medium significance</option>
						<option value="high">High significance</option>
					</Select>
				</FormControl>

				<TriggerTestRun
					buttonText="Trigger single test"
					singleOrAll="single"
					userStoryId={userStory?.id}
				/>

				<Box>
					<Heading
						as="h2"
						d="flex"
						alignItems="center"
						fontSize="lg"
						fontWeight="800"
						lineHeight="short"
					>
						Recent activity
					</Heading>
					<Divider mt={1} />
					<Box overflow="auto" maxH="278px">
						{userStory?.testOutcome?.items.map((outcome, index) => (
							<RecentActivityCard
								key={index}
								type={
									outcome.status == 'passing'
										? 'success'
										: outcome.status == 'did not run' ||
										  outcome.status == 'failing'
										? 'error'
										: 'info'
								}
								title={`${
									outcome.status == 'passing'
										? 'Passing'
										: outcome.status == 'did not run' ||
										  outcome.status == 'failing'
										? 'Failing'
										: 'In progress'
								} run`}
								date={outcome.createdAt}
								link={`/${slugifiedProjectName}/test-runs/${outcome.testRun.id}`}
							/>
						))}

						<RecentActivityCard
							type="info"
							title={`Case created by ${
								userStory?.createdBy?.firstName === 'Makenna'
									? 'Meeshkan'
									: userStory?.createdBy?.firstName
							}`}
							date={userStory?.createdAt}
							icon={
								<Avatar
									src={
										userStory?.createdBy?.firstName === 'Makenna'
											? 'https://media.graphcms.com/Sf3Hxc3gQP6ylXt8d3EX'
											: userStory?.createdBy?.avatar?.downloadUrl
									}
									borderRadius="md"
									boxSize={4}
								/>
							}
						/>
					</Box>
				</Box>
			</Stack>
		</>
	);
};
