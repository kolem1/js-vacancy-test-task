import { Card as MantineCard, Box, SimpleGrid, Stack, Title, Text, Skeleton } from '@mantine/core';

import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { RoutePath } from 'routes';

import { PlusIcon } from 'public/icons';
import { productApi } from 'resources/product';
import { Product } from 'types';
import { Card } from 'components';
import { useCallback } from 'react';
import classes from './index.module.css';

const YourProducts: NextPage = () => {
  const { data, isLoading: isProductsLoading } = productApi.useListForUser();

  const { mutate: remove, isLoading: isDeleteLoading } = productApi.useRemove();

  const handleDelete = useCallback(
    (product: Product) => remove(product._id),
    [remove],
  );

  return (
    <>
      <Head>
        <title>Your Products</title>
      </Head>
      <Stack gap="lg">
        <Title order={1} size={20} fw={700}>Your Products</Title>
        <Skeleton visible={isProductsLoading}>
          <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, xl: 4 }}>
            <MantineCard className={classes.card} component={NextLink} type="router" href={RoutePath.CreateNewProduct} mih={266}>
              <Stack align="center">
                <Box className={classes.plus} component="span"><PlusIcon /></Box>
                <Text size="xl" span>New Product</Text>
              </Stack>
            </MantineCard>

            {data?.map((product) => (
              <Card
                type="yourProduct"
                product={product}
                isDeleteLoading={isDeleteLoading}
                key={product._id}
                onDelete={handleDelete}
              />
            ))}
          </SimpleGrid>
        </Skeleton>
      </Stack>
    </>
  );
};

export default YourProducts;
