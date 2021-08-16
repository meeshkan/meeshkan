interface IntercomSettings {
	app_id?: string;
	email?: string;
	name?: string;
	user_id?: string;
	hide_default_launcher?: boolean;
	company?: {
		company_id: string;
		name: string;
		website?: string;
		plan?: string;
		upgraded_at?: Date;
		monthly_spend?: number;
	};
}

export interface Intercom {
	(command: 'boot', param: IntercomSettings): void;
	(command: 'shutdown'): void;
	(command: 'update', param?: IntercomSettings): void;
	(command: 'hide'): void;
	(command: 'show'): void;
	(command: 'showMessages'): void;
	(command: 'onHide', param?: () => void): void;
	(command: 'trackEvent', event: string): void;
	(command: 'startTour', id: number): void;
}

export const boot = ({
	email,
	id,
	projectID,
	projectName,
	projectPlan,
	projectWebsite,
}: {
	email: string;
	id: string;
	projectID?: string;
	projectName?: string;
	projectPlan?: string;
	projectWebsite?: string;
}) => {
	const intercomSettings = {
		app_id: 'nou4ik17',
		email,
		user_id: id,
		company: {
			company_id: projectID,
			name: projectName,
			plan: projectPlan,
			website: projectWebsite,
		},
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

export const trackEvent = (event: string) => {
	window.Intercom('trackEvent', event);
};

export const startTour = (id: number) => {
	window.Intercom('startTour', id);
};
