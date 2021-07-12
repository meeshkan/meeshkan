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
	Divider,
	Tooltip,
	Link as ChakraLink,
} from '@chakra-ui/react';
import {
	CheckmarkIcon,
	ExternalLinkIcon,
	KeyIcon,
	RecordIcon,
	TrashIcon,
} from '@frontend/chakra-theme';
import _ from 'lodash';
import { useValidateSelectedProject } from '../../hooks/use-validate-selected-project';
import LoadingScreen from '../../components/organisms/loading-screen';
import GridCard, { GridCardProps } from '../../components/molecules/grid-card';
import UpdateProfileForm from '../../components/molecules/update-profile-form';
import UpdateProjectForm from '../../components/molecules/update-project-form';
import Card from '../../components/atoms/card';
import NotFoundError from '../404';
import InviteLinkInput from '../../components/molecules/invite-link-input';
import ScriptTagInput from '../../components/molecules/script-tag-input';
import SegmentedControl from '../../components/molecules/segmented-control';
import { UserContext, updateProductNotifications } from '../../utils/user';
import { User, AuthenticationToken } from '@frontend/meeshkan-types';
import { eightBaseClient } from '../../utils/graphql';
import {
	REMOVE_TEAM_MEMBER,
	REMOVE_AUTH_TOKEN,
	ADD_SUPPORT,
	TOGGLE_TEST_RUNS,
	UPDATE_HAS_RECEIVED_EVENTS,
	TOGGLE_RUN_STRATEGY,
} from '../../graphql/project';
import AuthenticationTokenForm from '../../components/molecules/authentication-token-form';
import {
	isChrome,
	getVersion as getExtensionVersion,
	startRecording,
	handleExtensionAuthHandshake,
} from '../../utils/extension';
import { useToaster } from '../../hooks/use-toaster';
import PlanAndBillingCard from '../../components/organisms/plan-and-billing';
import CIDocumentationCard from '../../components/organisms/ci-documentation';
import Link from 'next/link';
import { createSlug } from '../../utils/createSlug';

type SectionGridCardProps = Omit<GridCardProps, 'anchor' | 'overflowY'>;
const SectionGridCard = (props: SectionGridCardProps) => {
	return <GridCard anchor overflowY="visible" maxH={null} {...props} />;
};

const Settings = () => {
	const { found, loading } = useValidateSelectedProject();
	const toaster = useToaster();
	const user = useContext(UserContext);
	const {
		productNotifications,
		idToken,
		project,
		setProject,
		mutate: mutateUser,
	} = user;
	const [profileLoading, setProfileLoading] = useState(false);
	const [projectLoading, setProjectLoading] = useState(false);
	const [productUpdates, setProductUpdates] = useState(productNotifications);
	const [toggleTestRunnerIndex, setToggleTestRunnerIndex] = useState<
		0 | 1 | null
	>(null);
	const [runStrategy, setRunStrategy] = useState<0 | 1 | null>(null);
	const [members, setMembers] = useState<Array<User>>(
		project?.members?.items || []
	);
	const [tokens, setTokens] = useState<Array<AuthenticationToken>>(
		project?.configuration.authenticationTokens?.items || []
	);
	const [projectId, setProjectId] = useState<string>(project?.id);
	const [scriptResponded, setScriptResponded] = useState<boolean>(false);

	const listItemHoverBackgroundColor = useColorModeValue('gray.50', 'gray.800');
	const avatarColor = useColorModeValue('gray.700', 'gray.200');
	const avatarBackgroundColor = useColorModeValue('gray.200', 'gray.600');
	const linkColor = useColorModeValue('blue.500', 'blue.300');

	useEffect(() => {
		setProductUpdates(productNotifications);
	}, [productNotifications]);

	useEffect(() => {
		if (!project) {
			return;
		}

		setProjectId(project.id);
		setMembers(project.members.items);
		setTokens(project.configuration.authenticationTokens.items);
		setToggleTestRunnerIndex(project.configuration.activeTestRuns ? 0 : 1);
		setRunStrategy(project.configuration.runTestsConcurrently ? 0 : 1);
	}, [project]);

	useEffect(() => {
		const handleTestRunnerToggle = async (): Promise<void> => {
			const response = await client.request(TOGGLE_TEST_RUNS, {
				projectId,
				toggle: !toggleTestRunnerIndex,
			});

			const updatedTestRunnerToggle =
				response.projectUpdate.configuration.activeTestRuns;
			setProject({
				...project,
				configuration: {
					...project.configuration,
					activeTestRuns: updatedTestRunnerToggle,
				},
			});
		};

		if (
			!project ||
			toggleTestRunnerIndex === null ||
			!toggleTestRunnerIndex === project.configuration.activeTestRuns
		) {
			return;
		}

		handleTestRunnerToggle();
	}, [toggleTestRunnerIndex]);

	useEffect(() => {
		const handleRunStrategyToggle = async (): Promise<void> => {
			const response = await client.request(TOGGLE_RUN_STRATEGY, {
				projectId,
				toggle: !runStrategy,
			});

			const updatedRunStrategyToggle =
				response.projectUpdate.configuration.runTestsConcurrently;
			setProject({
				...project,
				configuration: {
					...project.configuration,
					runTestsConcurrently: updatedRunStrategyToggle,
				},
			});
		};

		if (
			!project ||
			runStrategy === null ||
			!runStrategy === project.configuration.runTestsConcurrently
		) {
			return;
		}

		handleRunStrategyToggle();
	}, [runStrategy]);

	useEffect(() => {
		if (!projectId) {
			return;
		}

		const handleMessageEvent = async (event: MessageEvent) => {
			const eventSource = event.source as Window;
			if (event.data.type === 'scriptReady') {
				setScriptResponded(true);
				eventSource.postMessage({ type: 'verifyScript' }, '*');
			}

			if (event.data.type === 'verifyScript') {
				const { version, clientId } = event.data;
				if (clientId !== projectId) {
					toaster({
						title: 'Incorrect project ID in script.',
						description:
							'The client ID in the script does not match the expected project ID.',
						status: 'error',
					});

					eventSource.close();
					return;
				}

				const response = await client.request(UPDATE_HAS_RECEIVED_EVENTS, {
					projectId,
					hasReceivedEvents: true,
				});

				const updatedHasReceivedEvents =
					response.projectUpdate.hasReceivedEvents;
				if (updatedHasReceivedEvents) {
					toaster({
						title: 'Script verified.',
						description:
							'You have successfully installed the Meeshkan Recorder Script!',
						status: 'success',
					});
				}

				setProject({
					...project,
					hasReceivedEvents: updatedHasReceivedEvents,
				});

				eventSource.close();
			}
		};

		window?.addEventListener('message', handleMessageEvent);
		return () => {
			window?.removeEventListener('message', handleMessageEvent);
		};
	}, [projectId]);

	const client = eightBaseClient(idToken);

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

	if (!found) {
		return <NotFoundError />;
	}

	const handleSwitchToggle = async (
		event: ChangeEvent<HTMLInputElement>
	): Promise<void> => {
		const { checked } = event.target;
		setProductUpdates(checked);

		const response = await updateProductNotifications(idToken, {
			productNotifications: checked,
		});

		await mutateUser({
			...user,
			productNotifications: response.userUpdate.productNotifications,
		});
	};

	const removeTeamMember = async (memberEmail: string): Promise<void> => {
		const response = await client.request(REMOVE_TEAM_MEMBER, {
			projectId,
			memberEmail,
		});

		const updatedMembers = response.projectUpdate.members.items;
		setMembers(updatedMembers);
		setProject({
			...project,
			members: {
				...project.members,
				items: updatedMembers,
			},
		});
	};

	const deleteToken = async (tokenID: string): Promise<void> => {
		const response = await client.request(REMOVE_AUTH_TOKEN, {
			projectID: projectId,
			tokenID: tokenID,
		});

		const updatedAuthenticationTokens =
			response.projectUpdate.configuration.authenticationTokens.items;
		setTokens(updatedAuthenticationTokens);
		setProject({
			...project,
			configuration: {
				...project.configuration,
				authenticationTokens: {
					...project.configuration.authenticationTokens,
					items: updatedAuthenticationTokens,
				},
			},
		});
	};

	const handleRecordLoginFlow = async () => {
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
			if (!project?.configuration?.productionURL) {
				toaster({
					status: 'error',
					title: 'No production URL specified',
					description:
						"To trigger the Meeshkan extension, you need to specify a production URL in your project's settings page.",
				});
				return;
			}

			handleExtensionAuthHandshake(user, false);
			startRecording({
				url: project.configuration.productionURL,
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

	const inviteSupport = async (): Promise<void> => {
		const response = await client.request(ADD_SUPPORT, {
			projectID: projectId,
		});

		const updatedMembers = response.projectUpdate.members.items;
		setMembers(updatedMembers);
		setProject({
			...project,
			members: {
				...project.members,
				items: updatedMembers,
			},
		});
	};

	const handleScriptVerification = () => {
		if (!project?.configuration?.productionURL) {
			toaster({
				title: 'Missing production URL.',
				description:
					'You need to specify your production URL to verify your script installation.',
				status: 'error',
			});

			return;
		}

		const childWindow = window?.open(
			`${project.configuration.productionURL}?meeshkanVerifyScript=${project.id}`
		);
		const interval = setTimeout(() => {
			clearInterval(interval);
			if (scriptResponded || childWindow.closed) {
				return;
			}

			toaster({
				title: 'Script verification failed.',
				description:
					'We could not find the Meeshkan Recorder Script in your webapp.',
				status: 'error',
			});

			childWindow.close();
		}, 5000);
	};

	return (
		<Box overflowY="scroll" w="100%">
			<Stack p={[6, 0, 0, 0]} w="100%" rounded="lg" spacing={6} mb={150}>
				<Heading fontSize="20px" color="gray.500" lineHeight="short">
					Personal
				</Heading>
				<SectionGridCard
					title="Profile"
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
				</SectionGridCard>
				<SectionGridCard
					title="Notifications"
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
				</SectionGridCard>
				<Heading fontSize="20px" color="gray.500" lineHeight="short" pt={5}>
					Project
				</Heading>
				<SectionGridCard
					title="General"
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
				</SectionGridCard>
				<SectionGridCard
					title="Team Members"
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
									backgroundColor: listItemHoverBackgroundColor,
								}}
							>
								<Flex w="250px">
									<Avatar
										name={memberName}
										src={memberAvatar && memberAvatar}
										size="xs"
										borderRadius="md"
										mr={4}
										color={avatarColor}
										bg={avatarBackgroundColor}
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
				</SectionGridCard>

				<SectionGridCard
					title="Details"
					subtitle="Detailed configuration for your project."
				>
					<Heading fontSize="18px" fontWeight="500" mb={3}>
						Script tag{' '}
						<Box
							as={project?.hasReceivedEvents ? 'span' : ChakraLink}
							// _hover={{ textDecoration: 'underline' }}
							// cursor="pointer"
							fontSize="md"
							ml={4}
							fontWeight="normal"
							color={linkColor}
							onClick={
								project?.hasReceivedEvents ? null : handleScriptVerification
							}
						>
							{project?.hasReceivedEvents ? (
								<CheckmarkIcon boxSize={3} mr={3} />
							) : null}
							{project?.hasReceivedEvents
								? 'Installation Verified'
								: 'Verify Installation'}
							{project?.hasReceivedEvents ? null : (
								<ExternalLinkIcon boxSize={3} ml={2} />
							)}
						</Box>
					</Heading>
					<Flex align="center" justify="space-between">
						<ScriptTagInput />
						{/* <Button
							onClick={handleScriptVerification}
							isDisabled={
								project?.hasReceivedEvents ||
								!project?.configuration?.productionURL
							}
							variant="subtle"
							colorScheme={project?.hasReceivedEvents ? 'cyan' : 'blue'}
							ml={4}
						>
							{project?.hasReceivedEvents
								? 'Script Verified'
								: 'Verify Installation'}
						</Button> */}
					</Flex>

					<Spacer h={8} />

					<FormControl
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<Stack mr={5}>
							<Heading fontSize="18px" fontWeight="500">
								Test runner
							</Heading>
							<Text
								fontSize="sm"
								fontWeight="400"
								lineHeight="short"
								color="gray.500"
							>
								Enable the Meeshkan test runner.
							</Text>
						</Stack>
						<SegmentedControl
							values={['on', 'off']}
							selectedIndex={toggleTestRunnerIndex}
							setSelectedIndex={setToggleTestRunnerIndex}
						/>
					</FormControl>

					<Spacer h={8} />

					<FormControl
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<Stack mr={5}>
							<Heading fontSize="18px" fontWeight="500">
								Run strategy
							</Heading>
							<Text
								fontSize="sm"
								fontWeight="400"
								lineHeight="short"
								color="gray.500"
							>
								How would you like to run your tests? Concurrent = at the same
								time. Sequential = one after another.
							</Text>
						</Stack>
						<SegmentedControl
							values={['Concurrent', 'Sequential']}
							selectedIndex={runStrategy}
							setSelectedIndex={setRunStrategy}
						/>
					</FormControl>

					<Spacer h={8} />

					<Heading fontSize="18px" fontWeight="500" mb={2}>
						Privacy
					</Heading>
					<Text
						fontSize="sm"
						fontWeight="400"
						lineHeight="short"
						color="gray.500"
						mb={4}
					>
						Meeshkan ignores specific inputs by default. Customization will be
						possible in the future. The following data is excluded from Meeshkan
						recordings.
					</Text>
					<Stack>
						<Checkbox defaultIsChecked isDisabled>
							<Code fontSize="md" colorScheme="cyan" p={2} borderRadius="md">
								[autocomplete=cc-*]
							</Code>{' '}
							(Credit card fields)
						</Checkbox>
						<Checkbox defaultIsChecked isDisabled>
							<Code fontSize="md" colorScheme="cyan" p={2} borderRadius="md">
								input[type=hidden]
							</Code>{' '}
							(Hidden fields)
						</Checkbox>
						<Checkbox defaultIsChecked isDisabled>
							<Code fontSize="md" colorScheme="cyan" p={2} borderRadius="md">
								input[type=password]
							</Code>{' '}
							(Password fields)
						</Checkbox>
					</Stack>
				</SectionGridCard>

				<SectionGridCard
					title="Authentication"
					subtitle="This is the user your tests will be run off of. Be sure that any of
								the tokens, or log in details you're supplying are not your own,
								or a customer's."
				>
					<Heading fontSize="18px" fontWeight="500" mb={4}>
						1. Method: Record the path your users take to log in.
					</Heading>
					<Flex alignItems="flex-end" justifyContent="space-between">
						<Button
							size="sm"
							colorScheme="red"
							variant="subtle"
							leftIcon={<RecordIcon />}
							onClick={handleRecordLoginFlow}
							ml={2}
						>
							Record log in flow
						</Button>
					</Flex>
					{project?.configuration?.logInStory ? (
						<Link
							href={`/${createSlug(project?.name)}/test-cases/${
								project?.configuration?.logInStory?.id
							}`}
						>
							<Flex
								as="a"
								w="100%"
								mt={4}
								p={3}
								borderRadius="md"
								justify="space-between"
								align="center"
								cursor="pointer"
								_hover={{
									backgroundColor: listItemHoverBackgroundColor,
								}}
							>
								<Flex>
									<Text>{project?.configuration?.logInStory?.title}</Text>
									<Tooltip label="This is the 'Log in flow'" placement="right">
										<Badge
											colorScheme="amber"
											fontWeight="700"
											fontSize="md"
											borderRadius="md"
											p={2}
											ml={4}
										>
											<KeyIcon />
										</Badge>
									</Tooltip>
								</Flex>

								<Text>
									{new Date(
										project?.configuration?.logInStory?.createdAt
									).toLocaleString()}
								</Text>
							</Flex>
						</Link>
					) : null}

					<Divider my={6} />

					<Heading fontSize="18px" fontWeight="500" mb={4}>
						2. Method: Add the tokens we should inject.
					</Heading>

					<AuthenticationTokenForm tokens={tokens} setTokens={setTokens} />
					{tokens?.length >= 1 ? (
						<Heading fontSize="14px" fontWeight="500" mt={6}>
							Active tokens
						</Heading>
					) : null}
					{tokens?.map((token) => (
						<Flex
							key={token.key}
							w="100%"
							p={2}
							borderRadius="md"
							justify="space-between"
							align="center"
							_hover={{
								backgroundColor: listItemHoverBackgroundColor,
							}}
						>
							<Flex align="center">
								<Flex align="center" w={['96px', '96px', '128px', '250px']}>
									<Badge
										mr={4}
										borderRadius="md"
										p={2}
										fontSize="sm"
										colorScheme="cyan"
										textTransform="capitalize"
									>
										{token.type}
									</Badge>
									<Text>{new Date(token.createdAt).toLocaleDateString()}</Text>
								</Flex>
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
				</SectionGridCard>
				<SectionGridCard
					title="CI Integrations"
					subtitle="Trigger Meeshkan test runs from within your CI pipeline."
				>
					<CIDocumentationCard />
				</SectionGridCard>
				<GridCard
					anchor
					title="Plan and Billing"
					subtitle="Information about the plan you're on and Billing powered by Stripe."
				>
					<PlanAndBillingCard />
				</GridCard>
			</Stack>
		</Box>
	);
};

export default Settings;

export { getServerSideProps } from '../../components/molecules/chakra';
