import React, { ReactNode, useContext, useEffect } from 'react';
import {
	Stack,
	useColorModeValue,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';
import { Analytics } from '@lightspeed/react-mixpanel-script';
import { UserContext } from '../../utils/user';
import PlanAndBillingCard from '../organisms/plan-and-billing';

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children, ...props }: LayoutProps) => {
	const user = useContext(UserContext);
	const { isOpen, onOpen, onClose } = useDisclosure({
		defaultIsOpen: true,
	});

	const project = user?.project;
	useEffect(() => {
		if (project && !project.configuration?.plan) {
			onOpen();
		}
	}, [project]);

	const backgroundColor = useColorModeValue('gray.100', 'gray.800');
	const modalBackground = useColorModeValue('white', 'gray.900');
	return (
		<Analytics
			appName="Meeshkan-webapp"
			identity={user?.idToken}
			// This is a 'super property' which attaches information to every event.
			eventData={{
				project: project?.name,
				plan: project?.configuration?.plan,
			}}
			profileData={{
				$avatar: user?.avatar,
				$email: user?.email,
				$distinct_id: user?.idToken,
				$first_name: user?.firstName,
				$last_name: user?.lastName,
				$created: user?.createdAt,
				// $transactions: "" add stripe here
			}}
		>
			<Stack
				p={[0, 6, 6, 6]}
				bg={backgroundColor}
				w="100%"
				h={['100%', '100%', '100%', '100vh']}
				mt={[12, 0, 0, 0]}
				d="flex"
				direction={['column', 'column', 'column', 'row']}
				spacing={[0, 6, 6, 6]}
				{...props}
			>
				{children}
			</Stack>

			{project && !project.configuration?.plan ? (
				<Modal
					isOpen={isOpen}
					onClose={onClose}
					closeOnOverlayClick={false}
					size="6xl"
					isCentered
					motionPreset="slideInBottom"
					scrollBehavior="inside"
				>
					<ModalOverlay />
					<ModalContent
						p={4}
						borderRadius="lg"
						backgroundColor={modalBackground}
					>
						<ModalHeader fontWeight="700">Choose a plan</ModalHeader>
						<ModalBody>
							<PlanAndBillingCard />
						</ModalBody>
					</ModalContent>
				</Modal>
			) : null}
		</Analytics>
	);
};
export default Layout;
