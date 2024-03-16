import { NextPage } from 'next';
import Head from 'next/head';
import { cartApi } from 'resources/cart';
import { Box } from '@mantine/core';
import { Table } from 'components';
import Layout from '../components/Layout';

import classes from './index.module.css';
import useColumns from './hooks/useColumns';

const History: NextPage = () => {
  const { data } = cartApi.useGetHistory();

  const columns = useColumns();

  return (
    <>
      <Head><title>History</title></Head>
      <Layout>
        {
        !!data?.results.length
          && (
            <Box className={classes.table}>
              <Table
                columns={columns}
                data={data.results}
                perPage={Infinity}
                verticalSpacing="md"
                horizontalSpacing="xs"
              />
            </Box>
          )
      }
      </Layout>
    </>
  );
};

export default History;
