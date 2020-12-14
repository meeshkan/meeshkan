import { useState, useContext, ChangeEvent } from 'react';
import {
    Box,
    FormControl,
    Stack,
    Heading,
    Button,
    Text,
    Switch,
} from '@chakra-ui/react';
import { useValidateSelectedProject } from '../../hooks/use-validate-selected-project';
import LoadingScreen from '../../components/organisms/loading-screen';
import GridCard from '../../components/molecules/grid-card';
import UpdateProfileForm from '../../components/molecules/update-profile-form';
import Card from '../../components/atoms/card';
import { UserContext, updateProductNotifications } from '../../utils/user';

const Settings = () => {
    const { loading } = useValidateSelectedProject();
	const { productNotifications, idToken } = useContext(UserContext);
    const [profileLoading, setProfileLoading] = useState(false);
	const [productUpdates, setProductUpdates] = useState(productNotifications);

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
                <Heading fontSize="20px" color="gray.500" lineHeight="short">Personal</Heading>
                <GridCard title="Profile" subtitle="Manage your Meeshkan Profile">
                    <UpdateProfileForm setLoading={setProfileLoading} />
                    <Button mt={4} type="submit" isLoading={profileLoading} form="form" ml="auto" d="block">
						Update profile
					</Button>
                </GridCard>
                <GridCard title="Notifications" subtitle="Manage the notifications you receive from Meeshkan.">
                    <FormControl display="flex" alignItems="center">
                        <Box>
                            <Heading fontSize="18px" fontWeight={500}>Product updates</Heading>
                            <Text fontSize="14px" color="gray.500">Receive emails when we have important Meeshkan updates to share.</Text>
                        </Box>
                        <Switch
							id="product-updates"
							ml={5}
							onChange={handleSwitchToggle}
							isChecked={productUpdates}
						/>
                    </FormControl>
                </GridCard>
                <Heading fontSize="20px" color="gray.500" lineHeight="short" pt={5}>Project</Heading>
                <GridCard title="General" subtitle="Manage your Project settings">
                </GridCard>
                <GridCard title="Team Members" subtitle="Manage your Project settings">
                </GridCard>
            </Stack>
        </Box>
    );
};

export default Settings;

export { getServerSideProps } from '../../components/molecules/chakra';
