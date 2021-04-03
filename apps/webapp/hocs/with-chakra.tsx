import ChakraProvider from '@molecules/chakra';

export interface IWithChakraProps {
	cookies: string | undefined;
}

const withChakra = (PageComponent: any) => {
	return (props: IWithChakraProps): JSX.Element => {
		return (
			<ChakraProvider cookies={props.cookies}>
				<PageComponent {...props} />
			</ChakraProvider>
		);
	};
};

export default withChakra;
