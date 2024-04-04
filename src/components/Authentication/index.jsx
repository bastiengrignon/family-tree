import React from 'react';

import { Button, Card, Center, Divider, Flex, Stack, Text, Title } from '@mantine/core';

import { AuthenticationConstants, AuthenticationLayout, FORM_TYPES } from './Authentication.constants';
import { useAuthHooks } from './Authentication.hooks';
import classes from './Authentication.module.scss';
import ForgotPasswordForm from './ForgotPasswordForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Authentication = ({ socialLayout = AuthenticationLayout.horizontal, providers = [] }) => {
  const { isLoading, form, toggleForm, loginWithSocial, filteredProviders } = useAuthHooks({ providers });
  return (
    <Card className={classes.cardContainer}>
      <Center>
        <Stack gap="xs">
          <Title ta="center">{AuthenticationConstants[form].title}</Title>
          <Center>
            <Flex gap="md" direction={socialLayout === AuthenticationLayout.horizontal ? 'row' : 'column'}>
              {filteredProviders.map(([provider, { icon, label }]) => (
                <Button key={provider} variant="outline" onClick={() => loginWithSocial(provider)} loading={isLoading}>
                  {socialLayout === AuthenticationLayout.vertical && <Text mr="xs">{label}</Text>}
                  {icon}
                </Button>
              ))}
            </Flex>
          </Center>
          <Divider label={AuthenticationConstants.separatorLabel} />
          {form === FORM_TYPES.login && <LoginForm toggleForm={toggleForm} />}
          {form === FORM_TYPES.register && <RegisterForm toggleForm={toggleForm} />}
          {form === FORM_TYPES.forgotPassword && <ForgotPasswordForm toggleForm={toggleForm} />}
        </Stack>
      </Center>
    </Card>
  );
};

export default Authentication;
