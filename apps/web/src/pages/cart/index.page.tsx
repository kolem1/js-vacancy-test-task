import { Center, Group, Image, Stack, Title, Text, Button } from '@mantine/core';
import { NextPage } from 'next';
import { RoutePath } from 'routes';
import NextLink from 'next/link';
import NextImage from 'next/image';
import cx from 'clsx';

import { useRouter } from 'next/router';
import classes from './index.module.css';

const CartPage: NextPage = () => {
  const { pathname } = useRouter();
  const products = [];
  return (
    <Stack>
      <Group>
        <NextLink
          className={cx(classes.link, {
            [classes.active]: pathname === RoutePath.Cart,
          })}
          href={RoutePath.Cart}
        >
          My cart
        </NextLink>
        <NextLink
          className={cx(classes.link, {
            [classes.active]: pathname === RoutePath.CartHistory,
          })}
          href={RoutePath.CartHistory}
        >
          History
        </NextLink>
      </Group>
      {
        products.length === 0
          ? (
            <Center>
              <Stack className={classes.emptyState} align="center">
                <Image className={classes.image} src="/images/empty_cart.png" width={206} height={206} component={NextImage} alt="empty cart" />
                <Title order={2} size={20}>Oops, there&apos;s nothing here yet!</Title>
                <Text size="sm">
                  You haven&apos;t made any purchases yet.
                  <br />
                  Go to the marketplace and make purchases.
                </Text>
                <Button fz={14} component={NextLink} href={RoutePath.Home}>
                  Go to Marketplace
                </Button>
              </Stack>
            </Center>
          )
          : <Stack />
      }
    </Stack>
  );
};

export default CartPage;
