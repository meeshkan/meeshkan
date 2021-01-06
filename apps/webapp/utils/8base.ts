import { eightBaseClient } from './graphql';
import { FILE_UPLOAD_INFO } from '../graphql/file';

export const getFileUploadInfo = async (idToken: string) => {
	const client = eightBaseClient(idToken);
	const data = await client.request(FILE_UPLOAD_INFO);
	return data.fileUploadInfo;
};

export const uploadFileFromUrl = async (idToken: string, url: string) => {
	const fileUploadInfo = await getFileUploadInfo(idToken);
	const { apiKey, policy, signature, path } = fileUploadInfo;
	const response = await fetch(
		`https://www.filestackapi.com/api/store/S3?key=${apiKey}&policy=${policy}&signature=${signature}&path=${path}`,
		{
			method: 'post',
			body: new URLSearchParams({ url }),
		}
	);
	return response.json();
};
