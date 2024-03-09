import { Center, Group, Image, Stack, Title, Text, Button, Divider, Flex, Box } from '@mantine/core';
import { NextPage } from 'next';
import { RoutePath } from 'routes';
import NextLink from 'next/link';
import NextImage from 'next/image';
import cx from 'clsx';

import { useRouter } from 'next/router';
import { cartApi } from 'resources/cart';
import { Table } from 'components';
import classes from './index.module.css';
import useColumns from './hooks/useColumns';

const CartPage: NextPage = () => {
  const { pathname } = useRouter();

  const { data } = cartApi.useGet();

  const columns = useColumns();

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
        !data?.results.length
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
          : (
            <Flex gap={78}>
              <Box className={classes.table}>
                <Table
                  columns={columns}
                  data={data.results}
                  perPage={Infinity}
                  verticalSpacing="md"
                  horizontalSpacing="xs"
                />
              </Box>
              <Stack w={315} gap="xl">
                <Title order={2} fz={20}>Summary</Title>
                <Divider />
                <Group justify="space-between">
                  <Text>Total price</Text>
                  <Text fw={700}>
                    $
                    {data.totalBill}
                  </Text>
                </Group>
                <Button>Proceed to Checkout</Button>
              </Stack>
            </Flex>
          )
      }
    </Stack>
  );
};

export default CartPage;
