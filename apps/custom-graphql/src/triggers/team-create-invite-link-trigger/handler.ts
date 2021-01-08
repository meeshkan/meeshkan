import {
	FunctionContext,
	FunctionEvent,
	FunctionResult,
} from '8base-cli-types';

type TriggerResult = FunctionResult<
	{
		firstName: string;
	},
	{},
	{},
	Array<object>
>;

export default async (
	event: FunctionEvent,
	ctx: FunctionContext
): TriggerResult => {
	return {
		data: {
			...event.data,
			firstName: 'Override firstName',
		},
		errors: [],
	};
};
