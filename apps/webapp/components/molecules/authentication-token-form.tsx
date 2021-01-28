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
import useSWR from 'swr';

export type AuthenticationTokens = {
	type: 'local storage' | 'cookie';
	key: string;
	value: string;
};

type CreateAuthenticationFormProps = {
	tokens: AuthenticationTokens[];
	setTokens: React.Dispatch<React.SetStateAction<AuthenticationTokens[]>>;
};

const AuthenticationTokenForm = ({
	tokens,
	setTokens,
}: CreateAuthenticationFormProps) => {
	const [toggleIndex, setToggleIndex] = useState(0);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit } = useForm<AuthenticationTokens>();
	const user = useContext(UserContext);
	const { projects, project, idToken, mutate: mutateUser } = user;

	const client = eightBaseClient(idToken);

	const onSubmit = async (formData: AuthenticationTokens): Promise<void> => {
		console.log(loading);
		setError('');
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
			})
			.catch((error) => {
				error.status(error);
			});

		await mutateUser({ ...user, projects }, false);
		console.log(loading);
	};

	return (
		<Flex
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			id="authenticationCreateForm"
			align="flex-end"
		>
			<FormControl
				id="type"
				isRequired
				maxW="max-content"
				mr={12}
				isInvalid={!!error}
			>
				<FormLabel>Type</FormLabel>
				<SegmentedControl
					values={['Cookie', 'Local storage']}
					selectedIndex={toggleIndex}
					setSelectedIndex={setToggleIndex}
					// ref={register}
				/>
			</FormControl>
			<FormControl id="key" isRequired mr={8} isInvalid={!!error}>
				<FormLabel>Key</FormLabel>
				<Input
					isDisabled={loading}
					name="key"
					// value={key}
					// onChange={handleKeyChange}
					type="text"
					ref={register}
				/>
			</FormControl>
			<FormControl
				id="value"
				mr={16}
				isRequired
				// isInvalid={!!error}
			>
				<FormLabel>Value</FormLabel>
				<Input
					isDisabled={loading}
					name="value"
					// value={value}
					// onChange={handleProductionURLChange}
					type="text"
					ref={register}
				/>
			</FormControl>
			<LightMode>
				<Button
					minW="min-content"
					type="submit"
					isLoading={loading}
					loadingText="Saving token"
					onClick={() => setLoading(true)}
				>
					Save token
				</Button>
			</LightMode>
		</Flex>
	);
};

export default AuthenticationTokenForm;
