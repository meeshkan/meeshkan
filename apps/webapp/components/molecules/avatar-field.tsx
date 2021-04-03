import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import {
	Text,
	Box,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	Spinner,
} from '@chakra-ui/react';
import { FilePlusIcon } from '@frontend/chakra-theme';
import { UserContext } from '@utils/user';
import { FILE_UPLOAD_INFO } from '../../graphql/file';
import { uploadFile } from '@utils/file';
import { UploadedFile } from '@frontend/meeshkan-types';
import { eightBaseClient } from '@utils/graphql';

const ReactFilestack = dynamic(() => import('filestack-react'), { ssr: false });

type AvatarFieldProps = {
	onUpload: (file: UploadedFile) => void | Promise<{ error?: typeof Error }>;
	existingImageUrl?: string;
};

const AvatarField = ({ onUpload, existingImageUrl }: AvatarFieldProps) => {
	const [error, setError] = useState('');
	const { project, idToken } = useContext(UserContext);
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(existingImageUrl || '');
	const client = eightBaseClient(idToken);
	const fetcher = (query: string) => client.request(query);
	const { data, error: uploadInfoError } = useSWR(FILE_UPLOAD_INFO, fetcher);

	useEffect(() => {
		setImage(existingImageUrl);
	}, [project, existingImageUrl]);

	if (!data && !uploadInfoError) {
		return (
			<Flex justify="center" mb={5}>
				<Spinner />
			</Flex>
		);
	}

	if (uploadInfoError) {
		setError(uploadInfoError);
	}

	const { apiKey, path, policy, signature } = data?.fileUploadInfo;

	const actionOptions = {
		accept: 'image/*',
		maxFiles: 1,
		storeTo: {
			location: 's3',
			path,
		},
	};

	const clientOptions = {
		security: {
			policy,
			signature,
		},
	};

	return (
		<FormControl id="avatar" isInvalid={!!error} mb={6}>
			<Flex justify="space-between">
				<Box>
					<FormLabel>Upload an avatar</FormLabel>
					<Text mt={3} color="gray.500">
						We suggest an image that is 200px by 200px or bigger.
					</Text>
				</Box>
				<ReactFilestack
					apikey={apiKey}
					actionOptions={actionOptions}
					clientOptions={clientOptions}
					customRender={({ onPick }) => (
						<Button
							as={Flex}
							role="group"
							variant="ghost"
							cursor="pointer"
							align="center"
							justify="center"
							borderWidth="1px"
							borderRadius="md"
							borderColor="gray.500"
							borderStyle="dashed"
							p={[4, 5, 6, 8]}
							ml={4}
							h={16}
							w={16}
							onClick={onPick}
							bgImage={image && `url(${image})`}
							bgSize="contain"
							bgPosition="center"
							bgRepeat="no-repeat"
						>
							{loading ? (
								<Spinner />
							) : (
								<FilePlusIcon
									w={8}
									h={8}
									visibility={image ? 'hidden' : 'visible'}
									_groupHover={{ visibility: 'visible' }}
								/>
							)}
						</Button>
					)}
					onSuccess={async (response) => {
						setLoading(true);
						const [newImage] = response.filesUploaded;

						const fileId = newImage.handle;
						const filename = newImage.key.split('/').slice(-1)[0];

						const uploadResponse = await uploadFile(idToken, {
							fileId,
							filename,
						});

						if (uploadResponse.error) {
							setError(uploadResponse.error);
							setLoading(false);
							return;
						}

						setImage(uploadResponse?.downloadUrl);
						onUpload({
							id: uploadResponse.id,
							fileId: uploadResponse.fileId,
						});

						setLoading(false);
					}}
				/>
			</Flex>
			<FormErrorMessage>Error: {error}</FormErrorMessage>
		</FormControl>
	);
};

export default AvatarField;
