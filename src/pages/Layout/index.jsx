import React from 'react';
import { Outlet } from 'react-router-dom';

import { AppShell, Center } from '@mantine/core';

import Authentication from '@components/Authentication';
import Header from '@components/Header';

import { useLayoutHooks } from './Layout.hooks';
import classes from './Layout.module.scss';

const Layout = () => {
  const { session } = useLayoutHooks();

  return (
    <AppShell header={{ height: 60 }} padding="lg" className={classes.appShellRoot}>
      <Header session={session} />
      <AppShell.Main>
        {session ? (
          <Outlet context={[session]} />
        ) : (
          <Center>
            <Authentication providers={['google', 'github']} />
          </Center>
        )}
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
