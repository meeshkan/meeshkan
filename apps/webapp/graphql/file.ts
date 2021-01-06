import { gql } from 'graphql-request';

export const FILE_UPLOAD_INFO = gql`
	query FILE_UPLOAD_INFO {
		fileUploadInfo {
			policy
			signature
			apiKey
			path
		}
	}
`;
