import React, { RefObject, useRef } from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Modal,
} from '@chakra-ui/react';

interface PromptDialogProps {
	isOpen: boolean;
	onCancel: () => void;
	onConfirm: () => void;
	okText?: string;
	cancelText?: string;
	title: string;
	message: string;
	finalFocusRef?: RefObject<HTMLElement>;
}

function PromptDialog(props: PromptDialogProps) {
	const {
		isOpen,
		onCancel,
		onConfirm,
		finalFocusRef,
		title,
		message,
		okText = 'Ok',
		cancelText = 'Cancel',
	} = props;
	const cancelRef = useRef(null);

	return (
		// @ts-ignore
		<Modal in={isOpen}>
			{(styles: any) =>
				(
					<AlertDialog
						leastDestructiveRef={cancelRef}
						finalFocusRef={finalFocusRef}
						onClose={onCancel}
						isOpen={true}
					>
						<AlertDialogOverlay opacity={styles.opacity} />
						<AlertDialogContent {...styles}>
							<AlertDialogHeader>{title}</AlertDialogHeader>
							{onCancel && <AlertDialogCloseButton />}
							<AlertDialogBody>{message}</AlertDialogBody>
							<AlertDialogFooter>
								{onCancel && (
									<Button ref={cancelRef} onClick={onCancel}>
										{cancelText}
									</Button>
								)}
								<Button variantColor="red" ml={3} onClick={onConfirm}>
									{okText}
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				) as any
			}
		</Modal>
	);
}

export default PromptDialog;
