import { useContext, useState } from 'react';
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
import { UserContext, updateAvatar as updateUserAvatar } from '../../utils/user';
import { FILE_UPLOAD_INFO } from '../../utils/8base';
import { eightBaseClient } from '../../utils/graphql';

const ReactFilestack = dynamic(() => import('filestack-react'), { ssr: false });

const AvatarField = () => {
    const [error, setError] = useState('');
    const { avatar, idToken } = useContext(UserContext);
    const [imageOriginalPath, setImageOriginalPath] = useState(avatar);
    const client = eightBaseClient(idToken);
    const fetcher = query => client.request(query);
    const { data, error: uploadInfoError, isValidating } = useSWR(
        FILE_UPLOAD_INFO,
        fetcher
    );

    if (isValidating || !data) {
        return (
            <Flex justify="center">
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
                            onClick={onPick}
                            bgImage={imageOriginalPath && `url(${imageOriginalPath})`}
                            bgSize="contain"
                            bgPosition="center"
                            bgRepeat="no-repeat"
                        >
                            {!imageOriginalPath && <FilePlusIcon w={8} h={8} />}
                        </Button>
                    )}
                    onSuccess={async (response) => {
                        const [image] = response.filesUploaded;
                        setImageOriginalPath(image.originalPath);

                        const result = await updateUserAvatar(idToken, {
                            fileId: image.handle,
                            filename: image.key.split('/').slice(-1)[0],
                        });

                        if (result.error) {
                            console.error(result.error);
                            setError('Could not upload image. Please try again.');
                        } else {
                            setError('');
                        }
                    }}
                />
            </Flex>
            <FormErrorMessage>Error: {error}</FormErrorMessage>
        </FormControl>
    );
};

export default AvatarField;
