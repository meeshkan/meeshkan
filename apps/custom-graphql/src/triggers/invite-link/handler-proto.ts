type TriggerResult = {
	data: any;
	errors: Array<object>;
};

function makeid(length) {
	var result = '';
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export default (create: boolean) => async (
	event: any,
	ctx: any
): Promise<TriggerResult> => {
	return {
		// if we're creating or if we are attempting a mutation with
		// a new invite link
		// this is a bit of a hack, but basically, we take whatever
		// link the person proposes, ignore it, and generate a new one
		data: {
			...event.data,
			...(create || event.data.inviteLink
				? { inviteLink: 'https://app.meeshkan.com/invite/' + makeid(8) }
				: {}),
		},
		errors: [],
	};
};
