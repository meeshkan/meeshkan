interface IntercomSettings {
	app_id?: string;
	email?: string;
	name?: string;
	user_id?: string;
	hide_default_launcher?: boolean;
}

export interface Intercom {
	(command: 'boot', param: IntercomSettings): void;
	(command: 'shutdown'): void;
	(command: 'update', param?: IntercomSettings): void;
	(command: 'hide'): void;
	(command: 'show'): void;
	(command: 'showMessages'): void;
	(command: 'onHide', param?: () => void): void;
}

export const boot = ({ email, id }: { email: string; id: string }) => {
	const intercomSettings = {
		app_id: 'nou4ik17',
		email,
		user_id: id,
		hide_default_launcher: true,
	};

	window.Intercom('boot', intercomSettings);
};

export const shutdown = () => {
	window.Intercom('shutdown');
};

export const update = (options: IntercomSettings) => {
	window.Intercom('update', options);
};

export const show = () => {
	update({ hide_default_launcher: false });
	window.Intercom('showMessages');
	window.Intercom('onHide', () => {
		update({ hide_default_launcher: true });
	});
};
