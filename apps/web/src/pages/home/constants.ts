import { ComboboxItem } from '@mantine/core';

export const PER_PAGE = 10;

export const selectOptions: ComboboxItem[] = [
  {
    value: 'newest',
    label: 'Sort by newest',
  },
  {
    value: 'oldest',
    label: 'Sort by oldest',
  },
];
