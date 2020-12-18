import { gql } from 'graphql-request';

export const REMOVE_TEAM_MEMBER = gql`
	mutation REMOVE_TEAM_MEMBER($projectId: ID!, $memberEmail: String) {
		projectUpdate(
			filter: { id: $projectId }
			data: { members: { disconnect: { email: $memberEmail } } }
		) {
			id
		}
	}
`;
