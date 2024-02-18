import { Box, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { FC, useState } from 'react';

import classes from './index.module.css';

const Filters: FC = () => {
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>('12');

  return (
    <Stack className={classes.root} gap="xl">
      <Group>
        <Title order={3} fw={700} fz={20}>Filters</Title>
      </Group>
      <Box>
        <Text fw={700} mb="sm">Price</Text>
        <Group wrap="nowrap">
          <TextInput value={from} size="sm" leftSectionWidth={54} leftSection="From:" onChange={(e) => setFrom(e.currentTarget.value)} />
          <TextInput value={to} size="sm" leftSection="To:" onChange={(e) => setTo(e.currentTarget.value)} />
        </Group>
      </Box>
    </Stack>
  );
};

export default Filters;
