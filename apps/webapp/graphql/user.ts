import { gql } from 'graphql-request';

export const CURRENT_USER = gql`
	query CurrentUser {
		user {
			id
			email
		}
	}
`;

export const SIGN_UP_USER = gql`
	mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
		userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
			id
			email
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser($id: ID!, $user: UserUpdateInput!) {
		userUpdate(filter: { id: $id }, data: $user) {
			id
		}
	}
`;

export const UPDATE_AVATAR = gql`
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

export const USER_AVATAR = gql`
	query CurrentUser {
		user {
			avatar {
				downloadUrl
				shareUrl
			}
		}
	}
`;

export const USER_PROFILE = gql`
	query CurrentUser {
		user {
			firstName
			lastName
			jobTitle
			productNotifications
		}
	}
`;

export const UPDATE_PRODUCT_NOTIFICATIONS = gql`
	mutation UpdateProductNotifications($id: ID!, $productNotifications: Boolean!) {
		userUpdate(
			filter: { id: $id }
			data: { productNotifications: $productNotifications }
		) {
			id
		}
	}
`;
