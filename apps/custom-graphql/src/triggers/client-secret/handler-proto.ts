const crypto = require('crypto');
type TriggerResult = {
  data: any;
  errors: Array<object>;
};

function makeSecret() {
  return crypto.randomBytes(64).toString('base64')
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
      ...(create || event.data.clientSecret
        ? { clientSecret: makeSecret() }
        : {}),
    },
    errors: [],
  };
};
