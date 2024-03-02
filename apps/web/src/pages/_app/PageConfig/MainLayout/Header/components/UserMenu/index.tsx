import { memo, FC } from 'react';
import { Group, UnstyledButton, useMantineTheme, Text } from '@mantine/core';

import { accountApi } from 'resources/account';

import { CartIcon } from 'public/icons';
import { IconLogout } from '@tabler/icons-react';

import classes from './index.module.css';

const UserMenu: FC = () => {
  const { mutate: signOut } = accountApi.useSignOut();

  const theme = useMantineTheme();

  return (
    <Group gap="xl" align="center">
      <UnstyledButton className={classes.cartButton}>
        <CartIcon />
        <Text span size="sm" className={classes.count} bg={theme.other.blue[600]}>
          3
        </Text>
      </UnstyledButton>

      <UnstyledButton onClick={() => signOut()}>
        <IconLogout display="block" color={theme.other.black[400]} size={40} stroke={1} />
      </UnstyledButton>
    </Group>
  );
};

export default memo(UserMenu);
