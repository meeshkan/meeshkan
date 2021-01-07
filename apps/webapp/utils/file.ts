import { eightBaseClient } from './graphql';
import { UPLOAD_FILE } from '../graphql/file';

export type UploadedFile = {
	id: string;
	fileId: string;
}

export const uploadFile = async (
	idToken: string,
	data: { fileId: string; filename: string }
) => {
	const client = eightBaseClient(idToken);
	try {
		const response = await client.request(UPLOAD_FILE, {
			fileId: data.fileId,
			filename: data.filename,
		});

		return response.fileCreate;
	} catch (error) {
		console.error(error);
		return {
			error: error.response.errors[0],
		}
	}
};
