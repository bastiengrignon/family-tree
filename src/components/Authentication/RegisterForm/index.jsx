import React, { useState } from 'react';

import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { hasLength, isEmail, matches, matchesField, useForm } from '@mantine/form';

import { showErrorNotification } from '@lib/notifications';

import { passwordRegexp } from '@constants/regex';
import supabase from '@constants/supabase';

import { AuthenticationConstants, FORM_TYPES } from '../Authentication.constants';

const RegisterForm = ({ toggleForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const registerForm = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validateInputOnBlur: true,
    validate: {
      firstName: hasLength({ min: 2 }, AuthenticationConstants.formValidation.atLeast2Characters),
      lastName: hasLength({ min: 2 }, AuthenticationConstants.formValidation.atLeast2Characters),
      email: isEmail(AuthenticationConstants.formValidation.email),
      password: matches(passwordRegexp, AuthenticationConstants.formValidation.password),
      confirmPassword: matchesField('password', AuthenticationConstants.formValidation.confirmPassword),
    },
  });

  const registerUser = async ({ firstName, lastName, email, password }) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    setIsLoading(false);
    if (error) {
      return showErrorNotification({ message: error.message });
    }
  };
  return (
    <form onSubmit={registerForm.onSubmit(registerUser)}>
      <Stack gap="xs">
        <TextInput
          label={AuthenticationConstants.register.firstNameLabel}
          {...registerForm.getInputProps('firstName')}
        />
        <TextInput label={AuthenticationConstants.register.lastNameLabel} {...registerForm.getInputProps('lastName')} />
        <TextInput label={AuthenticationConstants.emailAddressLabel} {...registerForm.getInputProps('email')} />
        <PasswordInput label={AuthenticationConstants.passwordLabel} {...registerForm.getInputProps('password')} />
        <PasswordInput
          label={AuthenticationConstants.register.confirmPasswordLabel}
          {...registerForm.getInputProps('confirmPassword')}
        />
        <Button type="submit" loading={isLoading}>
          {AuthenticationConstants.register.title}
        </Button>
        <Button variant="link" onClick={() => toggleForm(FORM_TYPES.login)}>
          {AuthenticationConstants.alreadyAnAccountLink}
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
