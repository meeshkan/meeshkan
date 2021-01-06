import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import {
	Box,
	FormControl,
	Stack,
	Heading,
	Button,
	Text,
	Switch,
	InputGroup,
	Input,
	InputRightElement,
	IconButton,
	useClipboard,
	useToast,
	Avatar,
	Flex,
	useColorModeValue,
} from '@chakra-ui/react';
import { CopyIcon, TrashIcon } from '@frontend/chakra-theme';
import _ from 'lodash';
import { useValidateSelectedProject } from '../../hooks/use-validate-selected-project';
import LoadingScreen from '../../components/organisms/loading-screen';
import GridCard from '../../components/molecules/grid-card';
import UpdateProfileForm from '../../components/molecules/update-profile-form';
import UpdateProjectForm from '../../components/molecules/update-project-form';
import Card from '../../components/atoms/card';
import NotFoundError from '../404';
import {
	UserContext,
	updateProductNotifications,
	Member,
} from '../../utils/user';
import { eightBaseClient } from 'apps/webapp/utils/graphql';
import { REMOVE_TEAM_MEMBER } from '../../graphql/settings';

const Settings = () => {
	const { found, loading } = useValidateSelectedProject();
	const toast = useToast();
	const user = useContext(UserContext);
	const { productNotifications, idToken, project, projects, mutate: mutateUser } = user;
	const [profileLoading, setProfileLoading] = useState(false);
	const [projectLoading, setProjectLoading] = useState(false);
	const [productUpdates, setProductUpdates] = useState(productNotifications);
	const [members, setMembers] = useState<Array<Member>>(
		project?.members?.items || []
	);

	const client = eightBaseClient(idToken);

	const { hasCopied, onCopy } = useClipboard(
		project?.configuration?.inviteLink
	);

	useEffect(() => {
		if (hasCopied) {
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
						The project invite link was copied to your clipboard!
					</Box>
				),
				duration: 2000,
				isClosable: true,
			});
		}
	}, [hasCopied, toast]);

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

		const updatedMembers = members.filter((member) => member.email !== memberEmail);
		setMembers(updatedMembers);

		const selectedProjectIndex = _.findIndex(
			projects,
			currentProject => currentProject.id === project.id
		);

		projects[selectedProjectIndex].members.items = members;
		await mutateUser({ ...user, projects });

		return request;
	};

	return (
		<Box overflowY="scroll" w="100%">
			<Stack p={[6, 0, 0, 0]} w="100%" rounded="lg" spacing={6} mb={20}>
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
					<Flex justify="right" mt={4}>
						<Button
							mt={4}
							type="submit"
							isLoading={profileLoading}
							loadingText="Updating"
							form="profileUpdateForm"
						>
							Update profile
						</Button>
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
						<Button
							type="submit"
							isLoading={projectLoading}
							loadingText="Updating"
							form="projectUpdateForm"
						>
							Update project
						</Button>
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
					<InputGroup mb={4}>
						<Input
							value={project.configuration.inviteLink}
							color="blue.400"
							onClick={onCopy}
							isReadOnly
						/>
						<InputRightElement>
							<IconButton
								icon={<CopyIcon color="gray.500" />}
								aria-label="Copy invite link"
								onClick={onCopy}
								size="md"
								variant="ghost"
							/>
						</InputRightElement>
					</InputGroup>
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
			</Stack>
		</Box>
	);
};

export default Settings;

export { getServerSideProps } from '../../components/molecules/chakra';
