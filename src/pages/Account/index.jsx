import { IconHome, IconSettings } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  TextInput,
} from '@mantine/core';

import { AccountConstants } from './Account.constants';
import { useAccountHooks } from './Account.hooks';
import classes from './Account.module.scss';
import { routersPath } from '../../router';

const Account = () => {
  const { profileForm, updateProfile, deleteAccount } = useAccountHooks();
  const breadcrumbs = [
    {
      title: 'Accueil',
      link: routersPath.home,
      icon: <IconHome size={14} />,
    },
    {
      title: 'Paramètres',
      link: routersPath.account,
      icon: <IconSettings size={14} />,
    },
  ].map(({ title, link, icon }, index) => (
    <Badge component={Link} to={link} key={index} variant="light" className={classes.breadcrumbItem}>
      <Flex align="center" gap="xs">
        <div>{icon}</div>
        <div>{title}</div>
      </Flex>
    </Badge>
  ));

  return (
    <Stack gap="md">
      <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <Card>
          <form onSubmit={profileForm.onSubmit(updateProfile)}>
            <Flex gap="md">
              <Avatar size={150} radius="md" src={profileForm.values.avatarUrl} />
              <Stack gap="md">
                <Flex gap="md">
                  <TextInput
                    label={AccountConstants.update.firstNameLabel}
                    {...profileForm.getInputProps('firstName')}
                  />
                  <TextInput label={AccountConstants.update.lastNameLabel} {...profileForm.getInputProps('lastName')} />
                </Flex>
                <TextInput
                  label={AccountConstants.update.emailLabel}
                  {...profileForm.getInputProps('email')}
                  disabled
                />
              </Stack>
            </Flex>
            <Group justify="flex-end">
              <Button type="submit">{AccountConstants.update.updateButton}</Button>
            </Group>
          </form>
          <Divider label={AccountConstants.dangerZone} color="red" my="md" />
          <Button color="red" onClick={deleteAccount} disabled>
            {AccountConstants.deleteAccount.button}
          </Button>
        </Card>
      </SimpleGrid>
    </Stack>
  );
};

export default Account;
