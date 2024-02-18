import { memo, FC } from 'react';
import { AppShellHeader as LayoutHeader, Container, Group } from '@mantine/core';

import { accountApi } from 'resources/account';

import { Link } from 'components';
import { RoutePath } from 'routes';

import { LogoImage } from 'public/images';

import UserMenu from './components/UserMenu';
import ShadowLoginBanner from './components/ShadowLoginBanner';
import NavMenu from './components/NavMenu';

import classes from './index.module.css';

const Header: FC = () => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <LayoutHeader className={classes.header} withBorder={false}>
      {account.isShadow && <ShadowLoginBanner email={account.email} />}
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
};

export default memo(Header);
