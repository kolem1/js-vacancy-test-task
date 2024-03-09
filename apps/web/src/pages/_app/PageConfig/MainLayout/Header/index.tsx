import { memo, FC } from 'react';
import { AppShellHeader as LayoutHeader, Container, Group } from '@mantine/core';

import { Link } from 'components';
import { RoutePath } from 'routes';

import { LogoImage } from 'public/images';

import UserMenu from './components/UserMenu';
import NavMenu from './components/NavMenu';

import classes from './index.module.css';

const Header: FC = () => (
  <LayoutHeader className={classes.header} withBorder={false}>
    <Container
      px={32}
      py={0}
      fluid
    >
      <Group
        mih={72}
        justify="space-between"
      >
        <Link type="router" href={RoutePath.Home}>
          <LogoImage />
        </Link>

        <NavMenu />

        <UserMenu />
      </Group>

    </Container>
  </LayoutHeader>
);

export default memo(Header);
