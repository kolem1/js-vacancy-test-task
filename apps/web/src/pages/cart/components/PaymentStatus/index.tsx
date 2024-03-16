import { Center, Stack, Image, Text, Title, Button } from '@mantine/core';

import NextImage from 'next/image';
import NextLink from 'next/link';
import { RoutePath } from 'routes';

import { ReactElement, useMemo } from 'react';
import classes from './index.module.css';

interface PaymentStatusProps {
  status: 'success' | 'cancel'
}

const PaymentStatus = ({ status }: PaymentStatusProps) => {
  const pageConfig = useMemo<{ imageUrl: string, title: string, message: ReactElement | string }>(() => (status === 'success' ? ({
    imageUrl: '/images/payment-success.png',
    title: 'Payment Successfull',
    message: 'Hooray, you have completed your payment!',
  }) : ({
    imageUrl: '/images/payment-cancel.png',
    title: 'Payment Failed',
    message: (
      <>
        Sorry, your payment failed.
        <br />
        Would you like to try again?
      </>
    ),
  })), [status]);

  return (
    <Center mt={60}>
      <Stack className={classes.wrapper} align="center">
        <Image
          className={classes.image}
          src={pageConfig.imageUrl}
          width={56}
          height={56}
          component={NextImage}
          alt={status}
        />
        <Title order={2} size={24}>
          {pageConfig.title}
        </Title>
        <Text className={classes.text} size="sm">
          {pageConfig.message}
        </Text>
        <Button fz={14} component={NextLink} href={RoutePath.Cart}>
          Back to Cart
        </Button>
      </Stack>
    </Center>
  );
};

export default PaymentStatus;
