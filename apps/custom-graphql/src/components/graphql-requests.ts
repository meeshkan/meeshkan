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

export const CANCEL_OR_DELETE_PLAN = gql`
	mutation CANCEL_OR_DELETE_PLAN($projectID: ID!) {
		configurationUpdateByFilter(
			filter: { project: { id: { equals: $projectID } } }
			data: { subscriptionStatus: { set: "cancelled" } }
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

export const DELETE_CUSTOMER = gql`
	mutation DELETE_CUSTOMER($projectID: ID!) {
		configurationUpdateByFilter(
			filter: { project: { id: { equals: $projectID } } }
			data: {
				plan: { set: null }
				stripeCustomerID: { set: null }
				billingInterval: { set: null }
				subscriptionStatus: { set: null }
				subscriptionStartedDate: { set: null }
			}
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
