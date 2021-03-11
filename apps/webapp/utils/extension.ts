const extensionId = 'cfjdddhjecoeahjkmegbkakfpppflmgo';

export const latestVersion = '0.4.4';

export const isChrome = (): boolean => !!window.chrome;

export const startRecording = ({
	url,
	clientId,
	isAuthFlow = false,
}: {
	url: string;
	clientId: string;
	isAuthFlow: boolean;
}) => {
	window.chrome.runtime.sendMessage(extensionId, {
		message: 'startRecording',
		url,
		clientId,
		isAuthFlow,
	});
};

export const getVersion = () => {
	return new Promise((resolve, reject) => {
		window.chrome.runtime.sendMessage(
			extensionId,
			{ message: 'version' },
			(reply: any) => {
				if (reply?.version) {
					resolve(reply.version);
				} else {
					reject();
				}
			}
		);
	});
};
