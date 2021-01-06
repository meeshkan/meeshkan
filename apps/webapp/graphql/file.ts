import { gql } from 'graphql-request';

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
