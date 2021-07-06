import React, { ReactNode } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { CheckmarkIcon, XmarkIcon } from '@frontend/chakra-theme';
import { transparentize } from '@chakra-ui/theme-tools';
import Link from 'next/link';
import { InfoOutlineIcon } from '@chakra-ui/icons';

type RecentActivityProps = {
  type: 'info' | 'success' | 'error';
  title: string;
  date: Date;
  icon?: ReactNode;
  link?: string;
};

const Card = ({ type, title, date, icon }: RecentActivityProps) => {
  const redBackground = useColorModeValue(
    'red.50',
    transparentize('red.200', 0.16)
  );
  const redText = useColorModeValue('red.600', 'red.200');
  const cyanBackground = useColorModeValue(
    'cyan.50',
    transparentize('cyan.200', 0.16)
  );
  const cyanText = useColorModeValue('cyan.600', 'cyan.200');
  const grayBackground = useColorModeValue(
    'gray.100',
    transparentize('gray.200', 0.16)
  );
  const grayText = useColorModeValue('gray.600', 'gray.200');
  const secondaryText = useColorModeValue('gray.500', 'gray.400');
  return (
    <Flex align="center" my={3}>
      <Box
        // @ts-ignore
        backgroundColor={
          type == 'error'
            ? redBackground
            : type == 'success'
              ? cyanBackground
              : grayBackground
        }
        color={
          type == 'error' ? redText : type == 'success' ? cyanText : grayText
        }
        boxSize={8}
        borderRadius="full"
        mr={4}
        d="flex"
        alignItems="center"
        justifyContent="center"
      >
        {type == 'success' ? (
          <CheckmarkIcon />
        ) : type == 'error' ? (
          <XmarkIcon boxSize={3} />
        ) : (
          icon || <InfoOutlineIcon />
        )}
      </Box>
      <Box>
        <Text fontWeight="600" fontSize="sm">
          {title}
        </Text>
        <Text fontSize="sm" color={secondaryText}>
          {new Date(date).toLocaleDateString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
            day: 'numeric',
            month: 'short',
          })}
        </Text>
      </Box>
    </Flex>
  );
};

const RecentActivityCard = ({
  type,
  title,
  date,
  icon,
  link,
}: RecentActivityProps) => {
  return (
    <>
      {link ? (
        <Link href={link}>
          <a>
            <Card type={type} title={title} date={date} icon={icon} />
          </a>
        </Link>
      ) : (
        <Card type={type} title={title} date={date} icon={icon} />
      )}
    </>
  );
};

export default RecentActivityCard;
