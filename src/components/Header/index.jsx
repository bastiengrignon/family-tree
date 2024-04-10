import { IconChevronDown, IconLogout, IconSettings } from '@tabler/icons-react';
import cx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import { AppShell, Avatar, Flex, Group, Menu, rem, Text, Title, UnstyledButton } from '@mantine/core';

import { useHeaderHooks } from './Header.hooks';
import classes from './Header.module.scss';
import { routersPath } from '../../router';

const iconStyle = { width: rem(16), height: rem(16) };

const Header = ({ session }) => {
  const { user, userMenuOpened, setUserMenuOpened, gotToAccountPage, logout } = useHeaderHooks();

  return (
    <AppShell.Header>
      <Flex align="center" h="100%" px="lg" justify="space-between">
        <UnstyledButton component={Link} to={routersPath.home}>
          <Title order={4}>Family Tree</Title>
        </UnstyledButton>
        {session && (
          <Menu
            width={230}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
            withArrow
            offset={0}>
            <Menu.Target>
              <UnstyledButton className={cx(classes.userMenu, { [classes.userMenuActive]: userMenuOpened })}>
                <Group gap="xs" p="xs">
                  <Avatar
                    variant="gradient"
                    src={user.avatarUrl}
                    alt={user.fullName}
                    radius="xl"
                    size="sm"
                    color="blue"
                  />
                  <Text fw={500} size="sm">
                    {user.fullName}
                  </Text>
                  <IconChevronDown style={iconStyle} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconSettings style={iconStyle} />} onClick={gotToAccountPage}>
                Paramètres
              </Menu.Item>
              <Menu.Item leftSection={<IconLogout style={iconStyle} />} onClick={logout}>
                Se déconnecter
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Flex>
    </AppShell.Header>
  );
};

export default Header;
