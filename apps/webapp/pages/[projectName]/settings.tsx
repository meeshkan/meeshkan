import { useState } from 'react';
import { Box, Stack, Heading, Button } from '@chakra-ui/react';
import { useValidateSelectedProject } from '../../hooks/use-validate-selected-project';
import LoadingScreen from '../../components/organisms/loading-screen';
import GridCard from '../../components/molecules/grid-card';
import UpdateProfileForm from '../../components/molecules/update-profile-form';
import Card from '../../components/atoms/card';

const Settings = () => {
    const { loading } = useValidateSelectedProject();
    const [profileLoading, setProfileLoading] = useState(false);

	if (loading) {
		return <LoadingScreen as={Card} />;
	}

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
