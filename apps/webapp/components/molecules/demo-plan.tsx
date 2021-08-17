import { ReactNode, useMemo } from 'react';
import { BoxProps, Heading, Divider, Image } from '@chakra-ui/react';
import Card from '../atoms/card';
import { createSlug } from '../../utils/createSlug';

export type DemoPlanProps = {

} & BoxProps;

const DemoPlan = ({
  ...props
}: DemoPlanProps) => {
	return (
		<Card overflowY="auto" maxH="80vh" id={"demoPlanCard"} {...props}>
			<Heading
				as="h2"
				d="flex"
				alignItems="center"
				fontSize="lg"
				fontWeight="800"
				lineHeight="short"
			>
			  So, um, this is a demo plan and stuff.
				</Heading>
			</Card>
	);
};

export default DemoPlan;
