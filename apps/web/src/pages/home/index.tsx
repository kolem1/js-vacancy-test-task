import { useCallback, useLayoutEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Group,
  Stack,
  Skeleton,
  Text,
  Container,
  Grid,
  Title,
  SimpleGrid,
  Pagination,
  Center,
  Badge,
  UnstyledButton,
} from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';

import { productApi } from 'resources/product';
import { Card } from 'components';
import { Product } from 'types';
import { cartApi } from 'resources/cart';
import { IconX } from '@tabler/icons-react';
import { PER_PAGE, selectOptions } from './constants';

import classes from './index.module.css';
import Filters, { FiltersValue } from './components/Filters';
import SortSelect from './components/SortSelect';
import SearchInput from './components/SearchInput';

interface UsersListParams {
  page?: number;
  perPage?: number;
  searchValue?: string;
  sort?: {
    createdOn: 'asc' | 'desc';
  };
  filter?: {
    price?: {
      from: number | null;
      to: number | null;
    }
  };
}

const Home: NextPage = () => {
  const [sortBy, setSortBy] = useState(selectOptions[0].value);
  const [pageIndex, setPageIndex] = useState(1);

  const [params, setParams] = useState<UsersListParams>({});

  const [selectedPrices, setSelectedPrices] = useState<{ from: number, to: number } | null>(null);

  const [search, setSearch] = useInputState('');
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const handleSortByChange = useCallback((value: string | null) => {
    if (!value) return;
    setSortBy(value);
    setParams((prev) => ({
      ...prev,
      sort: value === 'newest' ? { createdOn: 'desc' } : { createdOn: 'asc' },
    }));
  }, []);

  const handleFilterChange = useCallback(({ price }: FiltersValue) => {
    setSelectedPrices(price.from > 0 || price.to > 0 ? price : null);
    setParams((prev) => ({
      ...prev,
      filter: {
        price: {
          from: price.from > 0 ? price.from : null,
          to: price.to > 0 ? price.to : null,
        },
      },
    }));
  }, []);

  const handleResetFilter = useCallback(() => {
    handleFilterChange({ price: { from: 0, to: 0 } });
  }, [handleFilterChange]);

  const handlePageChange = useCallback((currentPageIndex:number) => {
    setPageIndex(currentPageIndex);
    setParams((prev) => ({
      ...prev,
      page: currentPageIndex,
    }));
  }, []);

  useLayoutEffect(() => {
    setPageIndex(1);
    setParams((prev) => ({ ...prev, page: 1, searchValue: debouncedSearch, perPage: PER_PAGE }));
  }, [debouncedSearch]);

  const { data, isLoading: isListLoading } = productApi.useList(params);

  const { mutate: addToCart } = cartApi.useAdd();

  const handleAddToCart = useCallback((product: Product) => {
    addToCart({ productId: product._id });
  }, [addToCart]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Filters
            selectedPrices={selectedPrices}
            onChange={handleFilterChange}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 9 }}>

          <Stack gap="lg">
            <Skeleton
              className={classes.inputSkeleton}
              height={42}
              radius="sm"
              visible={isListLoading}
              width="auto"
            >
              <SearchInput searchValue={search} setSearchValue={setSearch} />
            </Skeleton>
            <Skeleton
              width="auto"
              height={42}
              radius="sm"
              visible={isListLoading}
            >
              <Group wrap="nowrap" justify="space-between">
                <Title order={2} size={16}>
                  {` ${data?.count ?? 0} `}
                  results
                </Title>
                <SortSelect
                  options={selectOptions}
                  sortBy={sortBy}
                  handleSortByChange={handleSortByChange}
                />
              </Group>
            </Skeleton>

            <Skeleton
              width="auto"
              height={42}
              radius="sm"
              visible={isListLoading}
            >
              {selectedPrices && (
              <Group wrap="nowrap" justify="space-between">
                <Badge
                  classNames={{
                    root: classes.filterBadge,
                    label: classes.badgeLabel,
                  }}
                  size="xl"
                  variant="white"
                >
                  {`$${selectedPrices.from}-$${selectedPrices.to}`}
                  {' '}
                  <UnstyledButton className={classes.deleteFilters} onClick={handleResetFilter}><IconX size={14} stroke={2} color="white" /></UnstyledButton>
                </Badge>
              </Group>
              )}
            </Skeleton>

            {isListLoading && (
            <>
              {[1, 2, 3].map((item) => (
                <Skeleton
                  key={`sklton-${String(item)}`}
                  height={50}
                  radius="sm"
                  mb="sm"
                />
              ))}
            </>
            )}

            {!!data?.items.length
          && (
            <Stack>
              <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
                {data.items.map((product) => (
                  <Card
                    key={product._id}
                    type="marketplace"
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </SimpleGrid>
              <Center>
                <Pagination
                  total={data.totalPages}
                  value={pageIndex}
                  onChange={handlePageChange}
                />
              </Center>
            </Stack>
          ) }
            {!isListLoading && !data?.items.length && (
              <Container p={75}>
                <Text size="xl" c="gray">
                  No results found, try to adjust your search.
                </Text>
              </Container>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Home;
