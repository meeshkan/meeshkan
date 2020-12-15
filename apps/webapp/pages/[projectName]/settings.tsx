import { useState, useEffect, useContext, ChangeEvent } from 'react';
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
} from '@chakra-ui/react';
import { Table, Tbody, Tr, Td } from '@chakra-ui/table';
import { CopyIcon, TrashIcon } from '@frontend/chakra-theme';
import { useValidateSelectedProject } from '../../hooks/use-validate-selected-project';
import LoadingScreen from '../../components/organisms/loading-screen';
import GridCard from '../../components/molecules/grid-card';
import UpdateProfileForm from '../../components/molecules/update-profile-form';
import UpdateProjectForm from '../../components/molecules/update-project-form';
import Card from '../../components/atoms/card';
import { UserContext, updateProductNotifications } from '../../utils/user';

const Settings = () => {
	const { loading } = useValidateSelectedProject();
	const toast = useToast();
	const { productNotifications, idToken, project } = useContext(UserContext);
	const [profileLoading, setProfileLoading] = useState(false);
	const [projectLoading, setProjectLoading] = useState(false);
	const [productUpdates, setProductUpdates] = useState(productNotifications);

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

	const handleSwitchToggle = async (event: ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		setProductUpdates(checked);
		await updateProductNotifications(idToken, {
			productNotifications: checked,
		});
	};

	return (
		<Box overflowY="scroll" w="100%">
			<Stack spacing={6}>
				<Heading fontSize="20px" color="gray.500" lineHeight="short">
					Personal
				</Heading>
				<GridCard title="Profile" subtitle="Manage your Meeshkan Profile">
					<UpdateProfileForm
						setLoading={setProfileLoading}
						formId="profileUpdateForm"
					/>
					<Button
						mt={4}
						type="submit"
						isLoading={profileLoading}
						form="profileUpdateForm"
						ml="auto"
						d="block"
					>
						Update profile
					</Button>
				</GridCard>
				<GridCard
					title="Notifications"
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
				<GridCard title="General" subtitle="Manage your Project settings">
					<UpdateProjectForm setLoading={setProjectLoading} />
					<Button
						mt={4}
						type="submit"
						isLoading={projectLoading}
						form="projectUpdateForm"
						ml="auto"
						d="block"
					>
						Update project
					</Button>
				</GridCard>
				<GridCard title="Team Members" subtitle="Manage your Project settings">
					<Heading fontSize="18px" fontWeight={500}>
						Invite link
					</Heading>
					<InputGroup>
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
					<Table mt={4} w="100%">
						<Tbody>
							{project.members.items.map((member) => {
								const memberName = `${member.firstName} ${member.lastName}`;
								const memberAvatar = member.avatar.downloadUrl;
								return (
									<Tr key={member.email} h={8}>
										<Td>
											<Avatar
												name={memberName}
												src={memberAvatar && memberAvatar}
												size="xs"
												borderRadius="md"
												backgroundColor="transparent"
											/>
										</Td>
										<Td>
											<Text fontWeight={600} fontSize="14px">
												{memberName}
											</Text>
										</Td>
										<Td>
											<Text fontSize="14px" color="gray.500">
												{member.email}
											</Text>
										</Td>
										<Td>
											<IconButton
												aria-label={`Remove ${member.firstName} from ${project.name}`}
												icon={<TrashIcon w={4} h={4} />}
												size="sm"
												variant="ghost"
												color="gray.500"
												isDisabled
											/>
										</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</GridCard>
			</Stack>
		</Box>
	);
};

export default Settings;

export { getServerSideProps } from '../../components/molecules/chakra';
