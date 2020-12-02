import { gql } from 'graphql-request';
import { eightBaseClient } from './graphql';

export const FILE_UPLOAD_INFO = gql`
	query FileUploadInfo {
		fileUploadInfo {
            policy
            signature
            apiKey
            path
		}
	}
`;

export const getFileUploadInfo = async (idToken: string) => {
    const client = eightBaseClient(idToken);
	const data = await client.request(FILE_UPLOAD_INFO);
	return data.fileUploadInfo;
};
