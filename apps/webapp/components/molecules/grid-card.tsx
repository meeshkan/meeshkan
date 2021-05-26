import { ReactNode, useMemo } from 'react';
import { BoxProps, Heading, Divider, Image } from '@chakra-ui/react';
import Card from '../atoms/card';
import { createSlug } from '../../utils/createSlug';

export type GridCardProps = {
	title: string;
	anchor?: boolean;
	subtitle?: string;
	children?: ReactNode;
	leftIconSrc?: string;
} & BoxProps;

const GridCard = ({
	title,
	anchor,
	subtitle,
	children,
	leftIconSrc,
	...props
}: GridCardProps) => {
	const slugifiedTitle = useMemo(() => createSlug(title), [title]);
	return (
		<Card overflowY="auto" maxH="80vh" id={slugifiedTitle} {...props}>
			<Heading
				id={anchor && slugifiedTitle}
				as="h2"
				d="flex"
				alignItems="center"
				fontSize="lg"
				fontWeight="800"
				lineHeight="short"
			>
				{leftIconSrc && (
					<Image src={leftIconSrc} boxSize="16px" alt={title} mr={3} />
				)}
				{title}
			</Heading>
			{subtitle && (
				<Heading
					as="h3"
					fontSize="sm"
					fontWeight="400"
					lineHeight="short"
					color="gray.500"
					mb={3}
					mt={1}
				>
					{subtitle}
				</Heading>
			)}

			<Divider mt={1} mb={4} />
			{children}
		</Card>
	);
};

export default GridCard;
