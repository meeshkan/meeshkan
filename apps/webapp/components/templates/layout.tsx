import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
	Stack,
	useColorModeValue,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
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
	const [hasPlan, setHasPlan] = useState(!!user?.project?.configuration?.plan);

	const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
		defaultIsOpen: true,
	});

	useEffect(() => {
		setHasPlan(!!user?.project?.configuration?.plan);
		// refreshes the state of open/close for the modal
		onOpen();
	}, [user?.project]);

	const backgroundColor = useColorModeValue('gray.100', 'gray.800');
	return (
		<Analytics
			appName="Meeshkan-webapp"
			identity={user?.idToken}
			// This is a 'super property' which attaches information to every event.
			eventData={{
				project: user?.project?.name,
				plan: user?.project?.configuration?.plan,
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

			{/* Doesn't have a plan, does have a project */}
			{!hasPlan && user?.project ? (
				<Modal
					isOpen={isOpen}
					onClose={onClose}
					size="6xl"
					isCentered
					motionPreset="slideInBottom"
					scrollBehavior="inside"
				>
					<ModalOverlay />
					<ModalContent p={4} borderRadius="lg" backgroundColor="gray.900">
						<ModalHeader fontWeight="700">Choose a plan</ModalHeader>
						<ModalCloseButton />
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
