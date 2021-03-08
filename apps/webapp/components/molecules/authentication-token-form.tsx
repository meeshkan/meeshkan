import React, { useContext, useState } from 'react';
import {
	Flex,
	FormControl,
	FormLabel,
	Input,
	Button,
	LightMode,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import SegmentedControl from './segmented-control';
import { UserContext } from '../../utils/user';
import { eightBaseClient } from 'apps/webapp/utils/graphql';
import { ADD_AUTH_TOKEN } from '../../graphql/project';
import { AuthenticationToken } from '../../utils/user';

type CreateAuthenticationFormProps = {
	tokens: AuthenticationToken[];
	setTokens: React.Dispatch<React.SetStateAction<AuthenticationToken[]>>;
};

const AuthenticationTokenForm = ({
	setTokens,
}: CreateAuthenticationFormProps) => {
	const [toggleIndex, setToggleIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit } = useForm<AuthenticationToken>();
	const user = useContext(UserContext);
	const { projects, project, idToken, mutate: mutateUser } = user;

	const client = eightBaseClient(idToken);

	const onSubmit = async (formData: AuthenticationToken): Promise<void> => {
		setLoading(true);
		client
			.request(ADD_AUTH_TOKEN, {
				projectID: project.id,
				type:
					toggleIndex === 0
						? 'cookie'
						: toggleIndex === 1
						? 'local storage'
						: undefined,
				key: formData.key,
				value: formData.value,
			})
			.then((res) => {
				setTokens(res.projectUpdate.configuration.authenticationTokens.items);
				setLoading(false);
			});

		await mutateUser({ ...user, projects }, false);
	};

	return (
		<Flex
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			id="authenticationCreateForm"
			align={['flex-start', 'flex-start', 'flex-end']}
			direction={['column', 'column', 'row']}
		>
			<FormControl
				id="type"
				isRequired
				maxW="max-content"
				mr={[0, 0, 6, 6, 12]}
				mb={[4, 4, 0]}
			>
				<FormLabel>Type</FormLabel>
				<SegmentedControl
					values={['Cookie', 'Local storage']}
					selectedIndex={toggleIndex}
					setSelectedIndex={setToggleIndex}
				/>
			</FormControl>
			<FormControl id="key" isRequired mr={[0, 0, 4, 4, 8]} mb={[4, 4, 0]}>
				<FormLabel>Key</FormLabel>
				<Input
					isDisabled={loading}
					name="key"
					type="text"
					ref={register({
						required: true,
					})}
				/>
			</FormControl>
			<FormControl id="value" mr={[0, 0, 8, 8, 16]} mb={[8, 8, 0]} isRequired>
				<FormLabel>Value</FormLabel>
				<Input
					isDisabled={loading}
					name="value"
					type="text"
					ref={register({
						required: true,
					})}
				/>
			</FormControl>
			<LightMode>
				<Button
					minW="min-content"
					type="submit"
					isLoading={loading}
					loadingText="Saving token"
					isDisabled={loading}
				>
					Save token
				</Button>
			</LightMode>
		</Flex>
	);
};

export default AuthenticationTokenForm;
