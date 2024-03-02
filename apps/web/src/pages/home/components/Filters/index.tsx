import { Box, Group, NumberInput, Stack, Text, Title } from '@mantine/core';
import { FC, useLayoutEffect, useState } from 'react';

import { useDebouncedValue } from '@mantine/hooks';
import classes from './index.module.css';

export interface FiltersValue {
  price: {
    from: number;
    to: number;
  }
}

interface FiltersProps {
  onChange: (filtersValue: FiltersValue) => void
}

const Filters: FC<FiltersProps> = ({ onChange }) => {
  const [from, setFrom] = useState<string | number>(0);
  const [to, setTo] = useState<string | number>(0);

  const [debouncedFrom] = useDebouncedValue(from, 500);
  const [debouncedTo] = useDebouncedValue(to, 500);

  useLayoutEffect(() => {
    onChange({ price: {
      from: +debouncedFrom, to: +debouncedTo,
    } });
  }, [debouncedFrom, debouncedTo, onChange]);

  return (
    <Stack className={classes.root} gap="xl">
      <Group>
        <Title order={3} fw={700} fz={20}>Filters</Title>
      </Group>
      <Box>
        <Text fw={700} mb="sm">Price</Text>
        <Group wrap="nowrap">
          <NumberInput
            value={from}
            size="sm"
            hideControls
            suffix="$"
            allowNegative={false}
            leftSectionWidth={54}
            leftSection="From:"
            onChange={setFrom}
          />
          <NumberInput
            value={to}
            size="sm"
            suffix="$"
            allowNegative={false}
            hideControls
            leftSection="To:"
            onChange={setTo}
          />
        </Group>
      </Box>
    </Stack>
  );
};

export default Filters;
