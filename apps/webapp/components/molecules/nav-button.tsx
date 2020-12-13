import React from 'react';
import {
	useColorModeValue,
	useMediaQuery,
	Link,
	PropsOf,
} from '@chakra-ui/react';
import MotionButton from '../atoms/motion-button';
import { transparentize } from '@chakra-ui/theme-tools';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 300, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 300 },
		},
	},
};

type SidebarLinkProps = PropsOf<typeof MotionButton> & {
	href?: string;
	icon?: React.ReactElement;
	disabled?: boolean;
};

const SidebarLink = (props: SidebarLinkProps) => {
	const { href, children, disabled, ...rest } = props;

	const { pathname } = useRouter();
	const isActive = pathname === href;
	const [isSmallScreen] = useMediaQuery('(max-width: 62em)');

	if (href && disabled !== true) {
		return (
			<NextLink href={href} passHref>
				<MotionButton
					as={Link}
					aria-current={isActive ? 'page' : undefined}
					isActive={isActive}
					size="sm"
					variant="ghost"
					colorScheme="gray"
					width="100%"
					justifyContent="flex-start"
					alignItems="center"
					fontWeight={500}
					fontSize="16px"
					color={useColorModeValue('gray.500', 'gray.400')}
					_active={{
						backgroundColor: useColorModeValue('gray.100', 'gray.800'),
						color: useColorModeValue('gray.900', 'white'),
					}}
					// @ts-ignore
					_hover={{
						backgroundColor: useColorModeValue(
							transparentize('gray.100', 0.75),
							transparentize('gray.800', 0.75)
						),
						textDecor: 'none',
					}}
					variants={isSmallScreen ? variants : {}}
					{...rest}
				>
					{children}
				</MotionButton>
			</NextLink>
		);
	} else {
		return (
			<MotionButton
				as={Link}
				aria-current={isActive ? 'page' : undefined}
				isActive={isActive}
				disabled={disabled}
				size="sm"
				variant="ghost"
				colorScheme="gray"
				width="100%"
				justifyContent="flex-start"
				alignItems="center"
				fontWeight={500}
				fontSize="16px"
				color={useColorModeValue('gray.500', 'gray.400')}
				_active={{
					backgroundColor: useColorModeValue('gray.100', 'gray.800'),
					color: useColorModeValue('gray.900', 'white'),
				}}
				// @ts-ignore
				_hover={{
					backgroundColor: useColorModeValue(
						transparentize('gray.100', 0.75),
						transparentize('gray.800', 0.75)
					),
					textDecor: 'none',
				}}
				variants={isSmallScreen ? variants : {}}
				{...rest}
			>
				{children}
			</MotionButton>
		);
	}
};

export default SidebarLink;
