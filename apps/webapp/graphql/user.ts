import { gql } from 'graphql-request';

export const CURRENT_USER_QUERY = gql`
	query CurrentUser {
		user {
			id
			email
		}
	}
`;

export const USER_SIGN_UP_MUTATION = gql`
	mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
		userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
			id
			email
		}
	}
`;

export const UPDATE_USER_MUTATION = gql`
	mutation UpdateUser($id: ID!, $user: UserUpdateInput!) {
		userUpdate(filter: { id: $id }, data: $user) {
			id
		}
	}
`;

export const UPDATE_AVATAR_MUTATION = gql`
	mutation UpdateAvatar($id: ID!, $fileId: String!, $filename: String!) {
		userUpdate(
			filter: { id: $id }
			data: { avatar: { create: { fileId: $fileId, filename: $filename } } }
		) {
			avatar {
				id
				downloadUrl
				shareUrl
			}
		}
	}
`;

export const USER_AVATAR_QUERY = gql`
	query CurrentUser {
		user {
			avatar {
				downloadUrl
				shareUrl
			}
		}
	}
`;

export const USER_PROFILE_QUERY = gql`
	query CurrentUser {
		user {
			firstName
			lastName
			jobTitle
			productNotifications
		}
	}
`;

export const UPDATE_PRODUCT_NOTIFICATIONS_MUTATION = gql`
	mutation UpdateProductNotifications($id: ID!, $productNotifications: Boolean!) {
		userUpdate(
			filter: { id: $id }
			data: { productNotifications: $productNotifications }
		) {
			id
		}
	}
`;
