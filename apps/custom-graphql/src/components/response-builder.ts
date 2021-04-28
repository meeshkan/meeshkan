/* Webhook response objects require a statusCode attribute to be specified. A response body can get specified as a stringified JSON object and any custom headers set. */

export const responseBuilder = (
	code: number = 200,
	message: string = undefined,
	headers: Record<string, string> = {}
) => ({
	body: JSON.stringify({ message }),
	statusCode: code,
	headers,
});
