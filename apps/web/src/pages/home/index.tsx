import Head from 'next/head';
import { NextPage } from 'next';
import { Grid } from '@mantine/core';
import Filters from './components/Filters';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Marketplace</title>
    </Head>
    <Grid gutter="lg">
      <Grid.Col span={3}><Filters /></Grid.Col>
      <Grid.Col span={9}>1</Grid.Col>
    </Grid>
  </>
);

export default Home;
