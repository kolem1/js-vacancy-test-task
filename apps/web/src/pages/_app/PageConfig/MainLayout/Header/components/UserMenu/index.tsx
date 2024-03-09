import { memo, FC, useCallback } from 'react';
import { Group, UnstyledButton, Text } from '@mantine/core';
import NextLink from 'next/link';
import { accountApi } from 'resources/account';

import { CartIcon } from 'public/icons';
import { IconLogout } from '@tabler/icons-react';
import cx from 'clsx';

import { RoutePath } from 'routes';
import { useRouter } from 'next/router';
import { cartApi } from 'resources/cart';
import classes from './index.module.css';

const UserMenu: FC = () => {
  const { pathname } = useRouter();

  const { mutate: signOut } = accountApi.useSignOut();
  const { data: cartCount } = cartApi.useCount();

  const handleSignOut = useCallback(() => signOut(), [signOut]);

  return (
    <Group gap="xl" align="center">
      <UnstyledButton
        href={RoutePath.Cart}
        component={NextLink}
        className={cx(classes.cartButton, {
          [classes.active]: pathname.startsWith(RoutePath.Cart),
        })}
      >
        <CartIcon className={classes.cartIcon} />
        {cartCount && cartCount.count > 0 && (
        <Text span size="sm" className={classes.count}>
          {cartCount.count}
        </Text>
        )}
      </UnstyledButton>

      <UnstyledButton onClick={handleSignOut}>
        <IconLogout className={classes.logOutIcon} display="block" size={40} stroke={1} />
      </UnstyledButton>
    </Group>
  );
};

export default memo(UserMenu);
