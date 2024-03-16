import { FC, Fragment, ReactElement } from 'react';
import { useRouter } from 'next/router';

import { accountApi } from 'resources/account';

import { routesConfiguration, ScopeType, LayoutType, RoutePath } from 'routes';

import MainLayout from './MainLayout';
import UnauthorizedLayout from './UnauthorizedLayout';

const layoutToComponent = {
  [LayoutType.MAIN]: MainLayout,
  [LayoutType.UNAUTHORIZED]: UnauthorizedLayout,
};

interface PageConfigProps {
  children: ReactElement;
}

const PageConfig: FC<PageConfigProps> = ({ children }) => {
  const { route, push } = useRouter();
  const { data: account, isLoading: isAccountLoading } = accountApi.useGet();

  if (isAccountLoading) return null;

  const { scope, layout } = routesConfiguration[route as RoutePath] || {};
  const Layout = layout ? layoutToComponent[layout] : Fragment;

  if (scope === ScopeType.PRIVATE && !account) {
    push(RoutePath.SignIn);
    return null;
  }

  if (scope === ScopeType.PUBLIC && account) {
    push(RoutePath.Home);
    return null;
  }

  return (
    <Layout>
      {children}
    </Layout>
  );
};

export default PageConfig;
