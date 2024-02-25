import { AspectRatio, Card as MantineCard, Image, Stack, Title, Group, Text, ActionIcon } from '@mantine/core';
import NextImage from 'next/image';

import { Product } from 'types';
import { IconTrash } from '@tabler/icons-react';
import classes from './index.module.css';
import StatusBadge from '../StatusBadge';

interface CardProps {
  product: Product;
  isDeleteLoading: boolean;
  onDelete: () => void;
}

const Card = ({ product, isDeleteLoading, onDelete }: CardProps) => (
  <MantineCard className={classes.card} key={product._id}>
    <MantineCard.Section mb="md" maw="auto">
      <AspectRatio ratio={271 / 174}>
        <Image src={product.imageUrl} sizes="380px" component={NextImage} fill alt={product.title} />
        <StatusBadge className={classes.badge} isSold={product.isSold} />
        <ActionIcon loading={isDeleteLoading} variant="white" className={classes.delete} onClick={onDelete}>
          <IconTrash />
        </ActionIcon>
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
    </Stack>
  </MantineCard>
);

export default Card;
