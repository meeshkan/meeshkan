# Meeshkan — the frontend mono-repo

This repo contains 4 apps that have some 'frontend' utility to the company.

1. `custom-graphql` this is where our 8base custom logic lives. [8base logic](https://docs.8base.com/docs/8base-console/platform-tools/functions/) allows you to deploy custom functionality and is the baseline for committing database migrations. In our case we have an invite link [trigger and updater](/Users/makennasmutz/Documents/GitHub/meeshkan/apps/custom-graphql/8base.yml). In order to use this repo, you'll need to be familiar with the [8base CLI](https://docs.8base.com/docs/development-tools/cli).
2. `og-cards` is a frontend micro-service that generates dynamic images for the sharing cards shown on socials for our website. It is deployed on Vercel and so far has needed little to no maintainance.
3. `webapp` this is the most active app in this repo. It is the meeshkan webapp (https://app.meeshkan.com) which is deployed on Vercel.
4. `website` this is here in a hopeful measure but not currently in use. Currently our live website repo is https://github.com/meeshkan/website. We'd like to transition this here to share the chakra-ui library.

This repo also contains 3 `libs` or NX libraries which are shared code between all of the frontend projects.

1. `chakra-theme` serves as the custom [Chakra UI](https://chakra-ui.com/) setup that we use accross any frontend projects.
2. `downloadable-script` is the microservice that converts the user story events/commands in 8base into a Puppeteer script.
3. `meeshkan-types` is a centralized place for custom TypeScript interfaces we use. Some are built custom but most come from 8base using a package called `graphql-code-gen`.

## Getting the `webapp` project working locally

This guide will use `yarn`. Feel free to use the `npm` equivalent to my instructions if that works better for you!

1. After cloning this repo to your computer — `cd` into the base repository (`meeshkan`).
2. Duplicate the `.env.template` file, renaming it to `.env`.
   - `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, and `SESSION_COOKIE_SECRET` can all be found in Auth0. If you do not have access to Auth0, contact @k4m4 or @KenzoBenzo to get you the tokens. The value of `AUTH0_DOMAIN` is "meeshkan.eu.auth0.com".
   - The token `NEXT_PUBLIC_EIGHTBASE_ENDPOINT` changes the 8base environment between `staging` "https://api.8base.com/ckhqdz5mu01r307mn6szcbdke_staging" and `Master` "https://api.8base.com/ckhqdz5mu01r307mn6szcbdke".
   - The token `EIGHT_BASE_AUTH_PROFILE_ID` can be found in 8base (log in found in 1pw).
   - The `TEST_URL` depends on how you serve your webapp locally. If you use the command `yarn start webapp` the value will be "localhost:3000". Change accordingly for a different port.
   - The `COOKIE` token can be found in Auth0, or https://app.meeshkan.com under our internal `Meeshkan webapp` project, auth tokens.
   - The `MIXPANEL_TOKEN` can be found in Mixpanel, but for local development (to not pollute production analytics) I'd suggest you use the `Test data` project token of "dd7febc8c2697fca8ed2d5523409a281".
3. While still in the base repository, install the project dependencies with `yarn`.
4. Start a development server of the webapp using the command `yarn start webapp`. You should then see a message that the port 3000 is now open and you can visit `localhost:3000`.
...
...
...