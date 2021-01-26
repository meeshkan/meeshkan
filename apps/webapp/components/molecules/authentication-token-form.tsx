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
	setLoading: (value: boolean) => void;
	tokens: AuthenticationTokens[];
	setTokens: React.Dispatch<React.SetStateAction<AuthenticationTokens[]>>;
};

const AuthorizationTokenForm = ({
	setLoading,
	tokens,
	setTokens,
}: CreateAuthenticationFormProps) => {
	const [toggleIndex, setToggleIndex] = useState(0);
	const [error, setError] = useState('');
	const { register, handleSubmit } = useForm<AuthenticationTokens>();
	const user = useContext(UserContext);
	const { projects, project, idToken, mutate: mutateUser } = user;

	const client = eightBaseClient(idToken);
	const fetcher = (query, variables?) => client.request(query, variables);

	const onSubmit = async (formData: AuthenticationTokens): Promise<void> => {
		setLoading(true);
		setError('');
		const { data, error: createTokenError, isValidating, mutate } = useSWR(
			[
				ADD_AUTH_TOKEN,
				{
					projectID: project.id,
					type: 'local storage',
					key: formData.key,
					value: formData.value,
				},
			],
			fetcher
		);
		setError(createTokenError);

		setTokens([...tokens, ...data.configuration.authenticationTokens?.items]);

		await mutateUser({ ...user, projects }, false);
		setLoading(isValidating);
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
					name="value"
					// value={value}
					// onChange={handleProductionURLChange}
					type="text"
					ref={register}
				/>
			</FormControl>
			<LightMode>
				<Button minW="min-content" type="submit">
					Save token
				</Button>
			</LightMode>
		</Flex>
	);
};

export default AuthorizationTokenForm;
