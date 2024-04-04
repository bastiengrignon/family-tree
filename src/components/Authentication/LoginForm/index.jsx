import React, { useState } from 'react';

import { Button, Flex, PasswordInput, Stack, TextInput } from '@mantine/core';
import { isEmail, matches, useForm } from '@mantine/form';

import { showErrorNotification } from '@lib/notifications';

import { passwordRegexp } from '@constants/regex';
import supabase from '@constants/supabase';

import { AuthenticationConstants, FORM_TYPES } from '../Authentication.constants';

const LoginForm = ({ toggleForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validateInputOnBlur: true,
    validate: {
      email: isEmail(AuthenticationConstants.formValidation.email),
      password: matches(passwordRegexp, AuthenticationConstants.formValidation.password),
    },
  });

  const loginUser = async ({ email, password }) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);
    if (error) {
      return showErrorNotification({ message: error.message });
    }
  };

  return (
    <form onSubmit={loginForm.onSubmit(loginUser)}>
      <Stack gap="xs">
        <TextInput label={AuthenticationConstants.emailAddressLabel} {...loginForm.getInputProps('email')} />
        <PasswordInput label={AuthenticationConstants.passwordLabel} {...loginForm.getInputProps('password')} />
        <Button type="submit" loading={isLoading}>
          {AuthenticationConstants.login.title}
        </Button>
      </Stack>
      <Flex direction="column">
        <Button variant="link" onClick={() => toggleForm(FORM_TYPES.forgotPassword)}>
          {AuthenticationConstants.login.forgotPasswordLink}
        </Button>
        <Button variant="link" onClick={() => toggleForm(FORM_TYPES.register)}>
          {AuthenticationConstants.login.noAccountLink}
        </Button>
      </Flex>
    </form>
  );
};

export default LoginForm;
