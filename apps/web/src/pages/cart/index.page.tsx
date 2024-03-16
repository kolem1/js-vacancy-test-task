import { Group, Stack, Title, Text, Button, Divider, Flex, Box } from '@mantine/core';
import { NextPage } from 'next';

import { cartApi } from 'resources/cart';
import { Table } from 'components';
import { checkoutApi } from 'resources/checkout';
import Head from 'next/head';
import classes from './index.module.css';
import useColumns from './hooks/useColumns';
import Layout from './components/Layout';

const CartPage: NextPage = () => {
  const { data } = cartApi.useGet();

  const { mutate: pay } = checkoutApi.usePay();

  const columns = useColumns();

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Layout>
        {
        !!data?.results.length
          && (
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
                <Button onClick={() => pay()}>Proceed to Checkout</Button>
              </Stack>
            </Flex>
          )
      }
      </Layout>
    </>
  );
};

export default CartPage;
