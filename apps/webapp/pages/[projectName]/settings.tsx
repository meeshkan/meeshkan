import React, { useState, useContext, ChangeEvent } from 'react';
import {
	Box,
	FormControl,
	Stack,
	Heading,
	Button,
	Text,
	Switch,
	IconButton,
	useToast,
	Avatar,
	Flex,
	useColorModeValue,
	Spacer,
	LightMode,
	Badge,
} from '@chakra-ui/react';
import { TrashIcon } from '@frontend/chakra-theme';
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
import {
	UserContext,
	updateProductNotifications,
	Member,
} from '../../utils/user';
import { eightBaseClient } from 'apps/webapp/utils/graphql';
import { REMOVE_TEAM_MEMBER } from '../../graphql/project';
import AuthorizationTokenForm, {
	AuthenticationTokens,
} from 'apps/webapp/components/molecules/authentication-token-form';

const Settings = () => {
	const { found, loading } = useValidateSelectedProject();
	const toast = useToast();
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
	const [authorizationLoading, setauthorizationLoading] = useState(false);
	const [productUpdates, setProductUpdates] = useState(productNotifications);
	const [members, setMembers] = useState<Array<Member>>(
		project?.members?.items || []
	);
	const [tokens, setTokens] = useState<Array<AuthenticationTokens>>(
		project?.configuration.authenticationTokens?.items || []
	);

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

		const updatedMembers = members.filter(
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
							<Heading fontSize="18px" fontWeight={500}>
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
					<Heading fontSize="18px" fontWeight={500}>
						Invite link
					</Heading>
					<InviteLinkInput />
					{members.map((member: Member) => {
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
									<Text fontWeight={600} fontSize="14px" textAlign="left">
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
										toast({
											position: 'bottom-right',
											render: () => (
												<Box
													color="white"
													p={4}
													bg="blue.500"
													borderRadius="md"
													fontSize="md"
												>
													{member.email} has been successfully removed from{' '}
													{project.name}.
												</Box>
											),
											duration: 2000,
											isClosable: true,
										});
									}}
								/>
							</Flex>
						);
					})}
				</GridCard>
				<GridCard
					title="Details"
					anchor
					subtitle="Detailed information about your project."
				>
					<Heading fontSize="18px" fontWeight={500}>
						Script tag
					</Heading>
					<ScriptTagInput />

					<Spacer h={8} />

					<Heading fontSize="18px" fontWeight={500}>
						Authentication
					</Heading>
					<Text
						fontSize="sm"
						fontWeight={400}
						lineHeight="short"
						color="gray.500"
						mb={4}
					>
						This is the user your tests will be tied to. Be sure that any of the
						tokens, or log in details you're supplying are not your own, or a
						customer's.
					</Text>
					<AuthorizationTokenForm
						setLoading={setauthorizationLoading}
						tokens={tokens}
						setTokens={setTokens}
					/>
					<Heading fontSize="14px" fontWeight={500} mt={4}>
						Active tokens
					</Heading>
					{tokens.map((token) => (
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
								<Box w={['auto', 'auto', '200px']} mr={10}>
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
								<Text mr={[16, 20, 24, 32]} w={['auto', 'auto', '200px']}>
									{token.key}
								</Text>
								<Text
									w="128px"
									whiteSpace="nowrap"
									overflow="hidden"
									textOverflow="ellipsis"
								>
									{token.value}
								</Text>
							</Flex>
							<IconButton
								isDisabled
								aria-label={`Remove`}
								icon={<TrashIcon w={4} h={4} />}
								size="sm"
								variant="ghost"
								colorScheme="red"
								// onClick={() => {
								// 	removeTeamMember(member.email);
								// 	toast({
								// 		position: 'bottom-right',
								// 		render: () => (
								// 			<Box
								// 				color="white"
								// 				p={4}
								// 				bg="blue.500"
								// 				borderRadius="md"
								// 				fontSize="md"
								// 			>
								// 				{member.email} has been successfully removed from{' '}
								// 				{project.name}.
								// 			</Box>
								// 		),
								// 		duration: 2000,
								// 		isClosable: true,
								// 	});
								// }}
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
