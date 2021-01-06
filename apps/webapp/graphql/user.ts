import { gql } from 'graphql-request';

export const CURRENT_USER = gql`
	query CURRENT_USER {
		user {
			id
			email
		}
	}
`;

export const SIGN_UP_USER = gql`
	mutation SIGN_UP_USER($user: UserCreateInput!, $authProfileId: ID) {
		userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
			id
			email
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UPDATE_USER($id: ID!, $user: UserUpdateInput!) {
		userUpdate(filter: { id: $id }, data: $user) {
			id
		}
	}
`;

export const UPDATE_AVATAR = gql`
	mutation UPDATE_AVATAR($id: ID!, $fileId: String!, $filename: String!) {
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
	query USER_AVATAR {
		user {
			avatar {
				downloadUrl
				shareUrl
			}
		}
	}
`;

export const USER_PROFILE = gql`
	query USER_PROFILE {
		user {
			firstName
			lastName
			jobTitle
			productNotifications
		}
	}
`;

export const UPDATE_PRODUCT_NOTIFICATIONS = gql`
	mutation UPDATE_PRODUCT_NOTIFICATIONS(
		$id: ID!
		$productNotifications: Boolean!
	) {
		userUpdate(
			filter: { id: $id }
			data: { productNotifications: $productNotifications }
		) {
			id
		}
	}
`;
