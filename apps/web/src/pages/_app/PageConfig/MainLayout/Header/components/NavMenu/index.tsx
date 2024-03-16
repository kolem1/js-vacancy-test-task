import NextLink from 'next/link';
import { memo, FC } from 'react';
import { Group, NavLink } from '@mantine/core';

import { useRouter } from 'next/router';

import { RoutePath } from 'routes';

const links = [
  { link: RoutePath.Home, label: 'Marketplace' },
  { link: RoutePath.MyProducts, label: 'Your Products' },
];

const NavMenu: FC = () => {
  const { pathname } = useRouter();

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      href={link.link}
      label={link.label}
      active={pathname === link.link || pathname.startsWith(`${link.link}/`)}
      component={NextLink}
    />
  ));

  return (
    <Group gap="xs" component="nav" fw={500} wrap="nowrap">
      {items}
    </Group>
  );
};

export default memo(NavMenu);
