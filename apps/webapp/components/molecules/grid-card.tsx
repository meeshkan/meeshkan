import {
	Heading,
	Divider,
} from '@chakra-ui/react';
import Card from '../atoms/card'

type GridCardProps = {
    title: string;
    children: ReactNode;
};

const GridCard = ({
    title,
    children,
    ...props
}: GridCardProps) => {
    return (
        <Card>
            <Heading
                as="h2"
                fontSize="lg"
                fontWeight={800}
                lineHeight="short"
            >
                {title}
            </Heading>
            <Divider mt={1} />
            {children}
        </Card>
    )
}

export default GridCard
