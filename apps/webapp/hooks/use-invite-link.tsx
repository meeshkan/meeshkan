import useSWR from 'swr';

export const useInviteLink = (inviteId: string) => {
	const { data, error, isValidating } = useSWR(`/api/invite/${inviteId}`);
	return { data, loading: isValidating, error };
};
