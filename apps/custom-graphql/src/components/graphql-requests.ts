import gql from 'graphql-tag';

export const PLAN_UPDATE = gql`
	mutation CONFIG_UPDATE(
		$projectID: ID!
		$planDetails: ConfigurationUpdateByFilterInput!
	) {
		configurationUpdateByFilter(
			filter: { project: { id: { equals: $projectID } } }
			data: $planDetails
		) {
			items {
				plan
				stripeCustomerID
				billingInterval
				subscriptionStatus
				subscriptionStartedDate
				project {
					name
				}
			}
		}
	}
`;
