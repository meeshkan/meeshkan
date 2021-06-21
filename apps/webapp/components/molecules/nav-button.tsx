import React, { ReactElement } from 'react';
import {
	useColorModeValue,
	useMediaQuery,
	Link,
	PropsOf,
} from '@chakra-ui/react';
import { MotionButton } from '../atoms/motion';
import { Variants } from 'framer-motion';
import { transparentize } from '@chakra-ui/theme-tools';
import NextLink from 'next/link';
import innerText from '../../utils/inner-text';
import { createSlug } from '../../utils/createSlug';

const variants: Variants = {
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

type NavButtonProps = PropsOf<typeof MotionButton> & {
	href?: string;
	icon?: ReactElement;
	isActive?: boolean;
	disabled?: boolean;
};

const NavButton = (props: NavButtonProps) => {
	const { href, children, disabled, isActive = false, ...rest } = props;
	const [isSmallScreen] = useMediaQuery('(max-width: 62em)');

	const color = useColorModeValue('gray.500', 'gray.400');
	const activeBackgroundColor = useColorModeValue('gray.100', 'gray.800');
	const activeColor = useColorModeValue('gray.900', 'white');
	const hoverBackgroundColor = useColorModeValue(
		transparentize('gray.100', 0.75),
		transparentize('gray.800', 0.75)
	);

	if (href && disabled !== true) {
		return (
			<NextLink href={href} passHref>
				<MotionButton
					id={`nav-${createSlug(innerText(children))}`}
					as={Link}
					aria-current={isActive ? 'page' : undefined}
					isActive={isActive}
					size="sm"
					variant="ghost"
					colorScheme="gray"
					width="100%"
					justifyContent="flex-start"
					alignItems="center"
					fontWeight="500"
					fontSize="16px"
					color={color}
					_active={{
						backgroundColor: activeBackgroundColor,
						color: activeColor,
					}}
					_hover={{
						backgroundColor: hoverBackgroundColor,
						textDecoration: 'none',
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
				fontWeight="500"
				fontSize="16px"
				color={color}
				_active={{
					backgroundColor: activeBackgroundColor,
					color: activeColor,
				}}
				_hover={{
					backgroundColor: hoverBackgroundColor,
					textDecoration: 'none',
				}}
				variants={isSmallScreen ? variants : {}}
				{...rest}
			>
				{children}
			</MotionButton>
		);
	}
};

export default NavButton;
