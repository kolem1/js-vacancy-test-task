import { AspectRatio, Card as MantineCard, Image, Stack, Title, Group, Text, ActionIcon, Button } from '@mantine/core';
import NextImage from 'next/image';

import { Product } from 'types';
import { IconTrash } from '@tabler/icons-react';
import { useCallback } from 'react';
import classes from './index.module.css';
import StatusBadge from './components/StatusBadge';

type CardType = 'marketplace' | 'yourProduct';

interface CardProps {
  type: CardType;
  product: Product;
  isDeleteLoading?: boolean;
  onDelete?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const Card = ({ type, product, isDeleteLoading, onDelete, onAddToCart }: CardProps) => {
  const handleDelete = useCallback(() => {
    if (onDelete) { onDelete(product); }
  }, [product, onDelete]);

  const handleAddToCart = useCallback(() => {
    if (onAddToCart) onAddToCart(product);
  }, [product, onAddToCart]);

  return (
    <MantineCard className={classes.card}>
      <MantineCard.Section mb="md" maw="auto">
        <AspectRatio ratio={271 / 174}>
          <Image src={product.imageUrl} sizes="380px" component={NextImage} fill alt={product.title} />
          {type === 'yourProduct' && (
            <StatusBadge className={classes.badge} isSold={product.isSold} />
          )}
        </AspectRatio>
      </MantineCard.Section>

      <Stack gap="sm">
        <Title size="20" fw={700} order={2}>{product.title}</Title>
        <Group justify="space-between">
          <Text size="sm" span className={classes.priceTitle}>Price:</Text>
          <Text size="xl" span className={classes.price}>
            $
            {product.price}
          </Text>
        </Group>
        {type === 'yourProduct' && (
          <ActionIcon
            loading={isDeleteLoading}
            variant="white"
            className={classes.delete}
            onClick={handleDelete}
          >
            <IconTrash />
          </ActionIcon>
        )}
        {type === 'marketplace' && (
          <Button size="md" fz={14} onClick={handleAddToCart}>
            Add to Cart
          </Button>
        )}
      </Stack>
    </MantineCard>
  );
};

export default Card;
