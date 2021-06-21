import React, { useContext, useEffect, useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Stack, Wrap, Code, WrapItem, Flex } from '@chakra-ui/layout';
import {
	Input,
	Textarea,
	Checkbox,
	Select,
	Avatar,
	Text,
	ButtonGroup,
	Button,
	useColorModeValue,
	useClipboard,
} from '@chakra-ui/react';
import {
	CheckmarkIcon,
	CopyIcon,
	DownloadIcon,
	XmarkIcon,
} from '@frontend/chakra-theme';
import {
	updateTitle,
	updateDescription,
	updateSignificance,
	updateRequiresAuthentication,
	onCreateTestCase,
	onDelete,
	handleDownload,
} from '../../../utils/user-story-helpers';
import { UserStory } from '@frontend/meeshkan-types';
import { UserContext } from '../../../utils/user';
import { createSlug } from '../../../utils/createSlug';
import { useToaster } from '../../../hooks/use-toaster';

type DetailsFormProps = {
	userStory: UserStory;
};

export const DetailsForm = ({ userStory }: DetailsFormProps) => {
	const { project, idToken } = useContext(UserContext);
	const [creatingTestCase, setCreatingTestCase] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const toaster = useToaster();

	const date = new Date().toISOString().replace('Z', '') + '+00:00';
	const formLabelColor = useColorModeValue('gray.500', 'gray.400');

	const slugifiedProjectName = createSlug(userStory?.title);
	const slugifiedStoryName = createSlug(userStory?.title);

	const { hasCopied, onCopy: handleCopy } = useClipboard(window.location.href);
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
			<FormControl>
				<FormLabel
					textTransform="uppercase"
					color={formLabelColor}
					fontSize="sm"
				>
					Created by
				</FormLabel>
				<Flex align="center" justify="space-between">
					<Flex align="center">
						<Avatar
							src={userStory?.createdBy?.avatar?.downloadUrl}
							borderRadius="md"
							mr={3}
							boxSize={4}
						/>
						<Text fontSize="sm" fontWeight="500" lineHeight="base">
							{userStory?.createdBy?.firstName +
								' ' +
								userStory?.createdBy?.lastName}
						</Text>
					</Flex>
					<Text fontSize="sm" color={formLabelColor} lineHeight="base">
						{new Date(userStory?.createdAt).toLocaleDateString('en-US', {
							hour: 'numeric',
							minute: 'numeric',
							second: 'numeric',
							hour12: false,
							day: 'numeric',
							month: 'short',
						})}
					</Text>
				</Flex>
			</FormControl>
			{userStory?.isTestCase === true ? (
				<ButtonGroup isAttached variant="subtle" size="sm" w="full">
					<Button
						w="full"
						colorScheme="blue"
						leftIcon={<CopyIcon />}
						onClick={() => handleCopy()}
					>
						Copy share link
					</Button>
					<Button
						w="full"
						colorScheme="gray"
						leftIcon={<DownloadIcon />}
						onClick={() =>
							handleDownload(
								userStory?.scriptCommands,
								project?.configuration?.authenticationTokens?.items,
								project?.configuration?.stagingURL,
								slugifiedStoryName
							)
						}
					>
						Download script
					</Button>
				</ButtonGroup>
			) : (
				<ButtonGroup isAttached variant="subtle" size="sm" w="full">
					<Button
						id="create-test-case"
						colorScheme={userStory?.isExpected ? 'cyan' : 'gray'}
						leftIcon={<CheckmarkIcon />}
						w="full"
						onClick={() =>
							onCreateTestCase({
								creatingTestCase,
								setCreatingTestCase,
								slugifiedProjectName,
								date,
								userStoryId: userStory?.id,
								idToken,
							})
						}
						isLoading={creatingTestCase}
					>
						Create test case
					</Button>
					<Button
						id="delete-recording"
						colorScheme={userStory?.isExpected ? 'gray' : 'red'}
						leftIcon={<XmarkIcon />}
						w="full"
						onClick={() => {
							onDelete({
								deleting,
								setDeleting,
								slugifiedProjectName,
								userStoryId: userStory?.id,
								idToken,
							});
						}}
						isLoading={deleting}
					>
						Delete recording
					</Button>
				</ButtonGroup>
			)}
		</Stack>
	);
};
