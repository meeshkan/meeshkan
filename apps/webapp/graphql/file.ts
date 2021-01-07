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

export const UPLOAD_FILE = gql`
	mutation UPLOAD_FILE(
		$fileId: String!,
		$filename: String!
	) {
		fileCreate(
			data: {
				fileId: $fileId
				filename: $filename
			}
		) {
			id
			fileId
			downloadUrl
		}
	}
`;
