import { ReactNode } from 'react';
import { BoxProps, Heading, Divider } from '@chakra-ui/react';
import Card from '../atoms/card';

type GridCardProps = {
	title: string;
	children?: ReactNode;
} & BoxProps;

const GridCard = ({ title, children, ...props }: GridCardProps) => {
	return (
		<Card overflowY="scroll" {...props}>
			<Heading as="h2" fontSize="lg" fontWeight={800} lineHeight="short">
				{title}
			</Heading>
			<Divider mt={1} mb={4} />
			{children}
		</Card>
	);
};

export default GridCard;
