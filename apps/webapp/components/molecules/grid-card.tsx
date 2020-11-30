import { ReactNode } from 'react';
import { BoxProps, Heading, Divider, Image } from '@chakra-ui/react';
import Card from '../atoms/card';

type GridCardProps = {
	title: string;
	children?: ReactNode;
	leftIconSrc?: string;
} & BoxProps;

const GridCard = ({ title, children, leftIconSrc, ...props }: GridCardProps) => {
	return (
		<Card overflowY="scroll" {...props}>
			<Heading
				as="h2"
				d="flex"
				alignItems="center"
				fontSize="lg"
				fontWeight={800}
				lineHeight="short"
			>
				{leftIconSrc && (
					<Image
						src={leftIconSrc}
						boxSize="16px"
						alt={title}
						mr={3}
					/>
				)}
				{title}
			</Heading>
			<Divider mt={1} mb={4} />
			{children}
		</Card>
	);
};

export default GridCard;
