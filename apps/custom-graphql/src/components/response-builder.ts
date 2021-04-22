/* Webhook response objects require a statusCode attribute to be specified. A response body can get specified as a stringified JSON object and any custom headers set. */

export const responseBuilder = (
	code = 200,
	message = undefined,
	headers = {}
) => ({
	body: JSON.stringify({ message }),
	statusCode: code,
	headers,
});
