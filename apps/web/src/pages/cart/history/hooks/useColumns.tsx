import { Group, Box, Title, Image, Text } from '@mantine/core';
import NextImage from 'next/image';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { CartHistoryProduct } from 'types';

const columnHelper = createColumnHelper<CartHistoryProduct
>();

export default function useColumns() {
  const columns = useMemo(() => [
    columnHelper.accessor(
      ({ imageUrl, title }) => ({ imageUrl, title }),
      {
        id: 'item',
        size: 70,
        header: () => 'Item',
        cell: (item) => {
          const { imageUrl, title } = item.getValue();

          return (
            <Group>
              {imageUrl
            && (
            <Box w={80} h={80}>
              <Image
                radius="md"
                component={NextImage}
                width={80}
                height={80}
                src={imageUrl}
                alt=""
              />
            </Box>
            )}
              <Title order={3} size={16}>{title}</Title>
            </Group>
          );
        },
      },
    ),
    columnHelper.accessor('price', {
      header: 'Unit Price',
      size: 10,
      minSize: 10,
      cell: (info) => (
        <Text fw={700}>
          $
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('quantity', {
      header: 'Quantity',
      size: 10,
      minSize: 10,
      cell: (item) => (
        <Text span>
          {item.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('soldDate', {
      header: 'Date',
      size: 10,
      minSize: 10,
      cell: (item) => (
        <Text span>{item.getValue()}</Text>
      ),
    }),
  ], []);

  return columns;
}
