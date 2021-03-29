import React, { useState, useContext, ChangeEvent, useEffect } from 'react';
import {
	Box,
	FormControl,
	Stack,
	Heading,
	Button,
	Text,
	Switch,
	IconButton,
	Avatar,
	Flex,
	useColorModeValue,
	Spacer,
	LightMode,
	Badge,
	Checkbox,
	Code,
} from '@chakra-ui/react';
import { RecordIcon, TrashIcon } from '@frontend/chakra-theme';
import _ from 'lodash';
import { useValidateSelectedProject } from '../../hooks/use-validate-selected-project';
import LoadingScreen from '../../components/organisms/loading-screen';
import GridCard from '../../components/molecules/grid-card';
import UpdateProfileForm from '../../components/molecules/update-profile-form';
import UpdateProjectForm from '../../components/molecules/update-project-form';
import Card from '../../components/atoms/card';
import NotFoundError from '../404';
import InviteLinkInput from '../../components/molecules/invite-link-input';
import ScriptTagInput from '../../components/molecules/script-tag-input';
import { UserContext, updateProductNotifications } from '../../utils/user';
import { User, AuthenticationToken } from '@frontend/meeshkan-types';
import { eightBaseClient } from '../../utils/graphql';
import {
	REMOVE_TEAM_MEMBER,
	REMOVE_AUTH_TOKEN,
	ADD_SUPPORT,
} from '../../graphql/project';
import AuthenticationTokenForm from '../../components/molecules/authentication-token-form';
import {
	isChrome,
	getVersion as getExtensionVersion,
	latestVersion as latestExtensionVersion,
	startRecording,
} from '../../utils/extension';
import { useToaster } from '../../hooks/use-toaster';

const Settings = () => {
	const { found, loading } = useValidateSelectedProject();
	const toaster = useToaster();
	const user = useContext(UserContext);
	const {
		productNotifications,
		idToken,
		project,
		projects,
		mutate: mutateUser,
	} = user;
	const [profileLoading, setProfileLoading] = useState(false);
	const [projectLoading, setProjectLoading] = useState(false);
	const [productUpdates, setProductUpdates] = useState(productNotifications);
	const [members, setMembers] = useState<Array<User>>(
		project?.members?.items || []
	);
	const [tokens, setTokens] = useState<Array<AuthenticationToken>>(
		project?.configuration.authenticationTokens?.items || []
	);

	useEffect(() => {
		setProductUpdates(productNotifications);
		setMembers(project?.members?.items);
		setTokens(project?.configuration.authenticationTokens?.items);
	}, [project, productNotifications]);

	const client = eightBaseClient(idToken);

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	if (!found) {
		return <NotFoundError />;
	}

	const handleSwitchToggle = async (event: ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		setProductUpdates(checked);

		await updateProductNotifications(idToken, {
			productNotifications: checked,
		});

		await mutateUser({ ...user, productNotifications: checked }, false);
	};

	const removeTeamMember = async (memberEmail: string) => {
		const request = client.request(REMOVE_TEAM_MEMBER, {
			projectId: project.id,
			memberEmail: memberEmail,
		});

		const updatedMembers = members?.filter(
			(member) => member.email !== memberEmail
		);
		setMembers(updatedMembers);

		const selectedProjectIndex = _.findIndex(
			projects,
			(currentProject) => currentProject.id === project.id
		);

		projects[selectedProjectIndex].members.items = members;
		await mutateUser({ ...user, projects });

		return request;
	};

	const deleteToken = async (tokenID: string) => {
		const request = client.request(REMOVE_AUTH_TOKEN, {
			projectID: project.id,
			tokenID: tokenID,
		});

		const updatedTokens = tokens?.filter((token) => token.id !== tokenID);
		setTokens(updatedTokens);

		await mutateUser({ ...user, projects });

		return request;
	};

	const handleNewUserStory = async () => {
		if (!isChrome()) {
			toaster({
				status: 'error',
				title: 'Could not trigger the Meeshkan extension',
				description:
					'You need to be using a Chromium browser to create manual user stories, for the time being.',
			});
			return;
		}

		try {
			const version = await getExtensionVersion();
			if (version !== latestExtensionVersion) {
				toaster({
					status: 'error',
					title: 'Meeshkan extension is outdated',
					description:
						'Please update to the latest version of the Meeshkan recorder extension.',
				});
				return;
			}

			if (!project?.configuration?.productionURL) {
				toaster({
					status: 'error',
					title: 'No production URL specified',
					description:
						"To trigger the Meeshkan extension, you need to specify a production URL in your project's settings page.",
				});
				return;
			}

			startRecording({
				url: project.configuration.productionURL,
				clientId: project.id,
				isAuthFlow: true,
			});
		} catch (error) {
			toaster({
				status: 'error',
				title: 'Extension is missing',
				description:
					'To begin creating manual user stories, please download the Meeshkan recorder extension via the Chrome Web Store.',
			});
		}
	};

	const isSupportAllowed = members?.some((member) => {
		return member.email === 'contact@meeshkan.com';
	});

	const inviteSupport = async () => {
		const res = await client.request(ADD_SUPPORT, {
			projectID: project.id,
		});
		setMembers(res.projectUpdate.members.items);

		const selectedProjectIndex = _.findIndex(
			projects,
			(currentProject) => currentProject.id === project.id
		);

		projects[selectedProjectIndex].members = res.projectUpdate.members;
		await mutateUser({ ...user, projects });
	};

	return (
		<Box overflowY="scroll" w="100%">
			<Stack p={[6, 0, 0, 0]} w="100%" rounded="lg" spacing={6} mb={150}>
				<Heading fontSize="20px" color="gray.500" lineHeight="short">
					Personal
				</Heading>
				<GridCard
					title="Profile"
					anchor
					subtitle="Manage your Meeshkan Profile"
				>
					<UpdateProfileForm
						setLoading={setProfileLoading}
						formId="profileUpdateForm"
					/>
					<Flex justifyContent="right" mt={4}>
						<LightMode>
							<Button
								mt={4}
								type="submit"
								isLoading={profileLoading}
								loadingText="Updating"
								form="profileUpdateForm"
							>
								Update profile
							</Button>
						</LightMode>
					</Flex>
				</GridCard>
				<GridCard
					title="Notifications"
					anchor
					subtitle="Manage the notifications you receive from Meeshkan."
				>
					<FormControl display="flex" alignItems="center">
						<Box>
							<Heading fontSize="18px" fontWeight="500">
								Product updates
							</Heading>
							<Text fontSize="14px" color="gray.500">
								Receive emails when we have important Meeshkan updates to share.
							</Text>
						</Box>
						<Switch
							id="product-updates"
							ml={5}
							onChange={handleSwitchToggle}
							isChecked={productUpdates}
						/>
					</FormControl>
				</GridCard>
				<Heading fontSize="20px" color="gray.500" lineHeight="short" pt={5}>
					Project
				</Heading>
				<GridCard
					title="General"
					anchor
					subtitle="Manage your Project settings"
				>
					<UpdateProjectForm setLoading={setProjectLoading} />
					<Flex justify="right" mt={4}>
						<LightMode>
							<Button
								type="submit"
								isLoading={projectLoading}
								loadingText="Updating"
								form="projectUpdateForm"
							>
								Update project
							</Button>
						</LightMode>
					</Flex>
				</GridCard>
				<GridCard
					title="Team Members"
					anchor
					subtitle="Manage your Project settings"
				>
					<Heading fontSize="18px" fontWeight="500">
						Invite link
					</Heading>
					<InviteLinkInput />
					{members?.map((member: User) => {
						const memberName = `${member.firstName || ''} ${
							member.lastName || ''
						}`;
						const memberAvatar = member?.avatar?.downloadUrl;
						return (
							<Flex
								key={member.email}
								w="100%"
								p={2}
								borderRadius="md"
								justify="space-between"
								align="center"
								_hover={{
									backgroundColor: useColorModeValue('gray.50', 'gray.800'),
								}}
							>
								<Flex w="250px">
									<Avatar
										name={memberName}
										src={memberAvatar && memberAvatar}
										size="xs"
										borderRadius="md"
										mr={4}
										color={useColorModeValue('gray.700', 'gray.200')}
										bg={useColorModeValue('gray.200', 'gray.600')}
									/>
									<Text fontWeight="600" fontSize="14px" textAlign="left">
										{memberName}
									</Text>
								</Flex>
								<Text fontSize="14px" color="gray.500" w="250px">
									{member.email}
								</Text>
								<IconButton
									aria-label={`Remove ${member.firstName} from ${project.name}`}
									icon={<TrashIcon w={4} h={4} />}
									size="sm"
									variant="ghost"
									colorScheme="red"
									onClick={() => {
										removeTeamMember(member.email);
										toaster({
											title: `${member.email} has been successfully removed.`,
											description: `If you didn't mean to remove them from ${project.name}, resend the invite link.`,
											status: 'success',
										});
									}}
								/>
							</Flex>
						);
					})}
					{isSupportAllowed ? null : (
						<Button
							w="100%"
							size="sm"
							colorScheme="gray"
							variant="subtle"
							mt={4}
							onClick={() => {
								inviteSupport();
								toaster({
									title: 'Successfully authorized Meeshkan support.',
									description: `contact@meeshkan.com has been successfully added to ${project.name}.`,
									status: 'info',
								});
							}}
						>
							Allow Meeshkan support access
						</Button>
					)}
				</GridCard>
				<GridCard
					title="Privacy"
					anchor
					subtitle="Meeshkan ignores specific inputs by default. Customization will be possible in the future. The following data is excluded from Meeshkan recordings."
				>
					<Stack>
						<Checkbox defaultIsChecked isDisabled>
							<Code fontSize="md" colorScheme="cyan">
								[autocomplete=cc-*]
							</Code>{' '}
							(Credit card fields)
						</Checkbox>
						<Checkbox defaultIsChecked isDisabled>
							<Code fontSize="md" colorScheme="cyan">
								input[type=hidden]
							</Code>{' '}
							(Hidden fields)
						</Checkbox>
						<Checkbox defaultIsChecked isDisabled>
							<Code fontSize="md" colorScheme="cyan">
								input[type=password]
							</Code>{' '}
							(Password fields)
						</Checkbox>
					</Stack>
				</GridCard>
				<GridCard
					title="Details"
					anchor
					subtitle="Detailed information about your project."
				>
					<Heading fontSize="18px" fontWeight="500" mb={2}>
						Script tag
					</Heading>
					<ScriptTagInput />

					<Spacer h={8} />

					<Flex alignItems="flex-end" justifyContent="space-between" mb={6}>
						<Box>
							<Heading fontSize="18px" fontWeight="500">
								Authentication
							</Heading>
							<Text
								fontSize="sm"
								fontWeight="400"
								lineHeight="short"
								color="gray.500"
							>
								This is the user your tests will be tied to. Be sure that any of
								the tokens, or log in details you're supplying are not your own,
								or a customer's.
							</Text>
						</Box>
						<Button
							size="sm"
							colorScheme="red"
							variant="subtle"
							leftIcon={<RecordIcon />}
							onClick={handleNewUserStory}
						>
							Record log in flow
						</Button>
					</Flex>

					<AuthenticationTokenForm tokens={tokens} setTokens={setTokens} />
					<Heading fontSize="14px" fontWeight="500" mt={4}>
						Active tokens
					</Heading>
					{tokens?.map((token) => (
						<Flex
							key={token.key}
							w="100%"
							p={2}
							borderRadius="md"
							justify="space-between"
							align="center"
							_hover={{
								backgroundColor: useColorModeValue('gray.50', 'gray.800'),
							}}
						>
							<Flex align="center">
								<Box w={['96px', '96px', '128px', '200px']}>
									<Badge
										borderRadius="md"
										p={2}
										fontSize="sm"
										colorScheme="cyan"
										textTransform="capitalize"
									>
										{token.type}
									</Badge>
								</Box>
								<Text
									mr={[4, 16, 24]}
									w={['64px', '80px', '128px']}
									whiteSpace="nowrap"
									overflow="hidden"
									textOverflow="ellipsis"
								>
									{token.key}
								</Text>
								<Text
									w={['64px', '80px', '128px']}
									whiteSpace="nowrap"
									overflow="hidden"
									textOverflow="ellipsis"
								>
									{token.value}
								</Text>
							</Flex>
							<IconButton
								aria-label={`Remove`}
								icon={<TrashIcon w={4} h={4} />}
								size="sm"
								variant="ghost"
								colorScheme="red"
								onClick={() => {
									deleteToken(token.id);
									toaster({
										title: `Successfully removed token ${token.key}.`,
										description: `The token will no longer be used to authenticate for test runs on ${project.name}.`,
										status: 'success',
									});
								}}
							/>
						</Flex>
					))}
				</GridCard>
			</Stack>
		</Box>
	);
};

export default Settings;

export { getServerSideProps } from '../../components/molecules/chakra';
