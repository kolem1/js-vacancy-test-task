import { Card, Box, SimpleGrid, Stack, Title, Text } from '@mantine/core';

import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { RoutePath } from 'routes';

import { PlusIcon } from 'public/icons';
import classes from './index.module.css';

const YourProducts: NextPage = () => (
  <>
    <Head>
      <title>Your Products</title>
    </Head>
    <Stack gap="lg">
      <Title order={1} size={20} fw={700}>Your Products</Title>
      <SimpleGrid cols={4}>
        <Card className={classes.newPrdocutCard} component={NextLink} type="router" href={RoutePath.CreateNewProduct} mih={266}>
          <Stack align="center">
            <Box className={classes.plus} component="span"><PlusIcon /></Box>
            <Text size="xl" span>New Product</Text>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  </>
);

export default YourProducts;
