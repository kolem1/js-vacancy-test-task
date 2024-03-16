import { Group, Box, Title, UnstyledButton, Image, Text } from '@mantine/core';
import NextImage from 'next/image';
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { cartApi } from 'resources/cart';
import { CartProductDto } from 'types';

import classes from './useColumns.module.css';

const columnHelper = createColumnHelper<CartProductDto
>();

export default function useColumns() {
  const { mutate: removeProduct } = cartApi.useRemove();
  const { mutate: updateProduct } = cartApi.useUpdate();

  const columns = useMemo(() => [
    columnHelper.accessor(
      ({ imageUrl, title }) => ({ imageUrl, title }),
      {
        id: 'item',
        size: 55,
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
      size: 15,
      minSize: 15,
      cell: (info) => (
        <Text fw={700}>
          $
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor(({ id, quantity, available }) => ({ id, quantity, available }), {
      id: 'quantity',
      header: 'Quantity',
      size: 15,
      minSize: 15,
      cell: (item) => {
        const { id, quantity, available } = item.getValue();

        const getUpdateCountHandler = (direction: 'up' | 'down') => () => {
          const newQuantity = direction === 'up' ? quantity + 1 : quantity - 1;

          updateProduct({ id, quantity: newQuantity });
        };

        return (
          <Group fz="md" gap="sm">
            <UnstyledButton
              className={classes.quantityControl}
              disabled={quantity <= 1}
              onClick={getUpdateCountHandler('down')}
            >
              <IconMinus size={20} />
            </UnstyledButton>
            <Text span>
              {quantity}
            </Text>
            <UnstyledButton
              className={classes.quantityControl}
              disabled={quantity >= available}
              onClick={getUpdateCountHandler('up')}
            >
              <IconPlus size={20} />
            </UnstyledButton>
          </Group>
        );
      },
    }),
    columnHelper.accessor('id', {
      id: 'remove',
      header: () => null,
      size: 15,
      minSize: 15,
      cell: (item) => {
        const id = item.getValue();
        return (
          <UnstyledButton className={classes.remove} onClick={() => removeProduct(id)}>
            <IconX size={20} />
            <Text span>
              Remove
            </Text>
          </UnstyledButton>
        );
      },
    }),
  ], [removeProduct, updateProduct]);

  return columns;
}
