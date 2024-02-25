import { Card as MantineCard, Box, SimpleGrid, Stack, Title, Text } from '@mantine/core';

import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { RoutePath } from 'routes';

import { PlusIcon } from 'public/icons';
import { productApi } from 'resources/product';
import classes from './index.module.css';
import Card from './components/Card';

const YourProducts: NextPage = () => {
  const { data } = productApi.useListForUser();

  const { mutate: remove, isLoading: isDeleteLoading } = productApi.useRemove();

  const getOnDelete = (id: string) => () => remove(id);

  return (
    <>
      <Head>
        <title>Your Products</title>
      </Head>
      <Stack gap="lg">
        <Title order={1} size={20} fw={700}>Your Products</Title>
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, xl: 4 }}>
          <MantineCard className={classes.card} component={NextLink} type="router" href={RoutePath.CreateNewProduct} mih={266}>
            <Stack align="center">
              <Box className={classes.plus} component="span"><PlusIcon /></Box>
              <Text size="xl" span>New Product</Text>
            </Stack>
          </MantineCard>

          {data?.map((product) => (
            <Card
              product={product}
              isDeleteLoading={isDeleteLoading}
              key={product._id}
              onDelete={getOnDelete(product._id)}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default YourProducts;
