import { gql } from 'graphql-request';
import { eightBaseClient } from './graphql';

const PROJECT_JOIN_MUTATION = gql`
    mutation JoinProject($userId: ID!, $inviteLink: String!) {
        configurationUpdate(
            filter: {
                inviteLink: $inviteLink
            }
            data: {
                project: {
                    update: {
                        members: {
                            connect: {
                                id: $userId
                            }
                        }
                    }
                }
            }
        ) {
            project {
                id
                name
            }
        }
    }
`

export const propagateInviteToDb = async (
    inviteId: string,
    userId: string
) => {
    const client = eightBaseClient(process.env.EIGHTBASE_TOKEN);

    let result;
	try {
		result = await client.request(PROJECT_JOIN_MUTATION, {
			userId: userId,
			inviteLink: `https://app.meeshkan.com/api/invite/${inviteId}`,
		});
	} catch (error) {
		console.error(error);
		result = {
			error: error.response.errors[0],
		};
	}

	return result;
};
