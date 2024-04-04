import React, { useState } from 'react';

import { Button, Stack, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';

import { showErrorNotification, showSuccessNotification } from '@lib/notifications';

import supabase from '@constants/supabase';

import { routersPath } from '../../../router';
import { AuthenticationConstants, FORM_TYPES } from '../Authentication.constants';

const ForgotPasswordForm = ({ toggleForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const forgotPasswordForm = useForm({
    initialValues: {
      email: '',
    },
    validateInputOnBlur: true,
    validate: {
      email: isEmail(AuthenticationConstants.formValidation.email),
    },
  });

  const sendResetPassword = async ({ email }) => {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:5173${routersPath.resetPassword}`,
    });
    setIsLoading(false);
    if (error) {
      return showErrorNotification({ message: error.message });
    }
    showSuccessNotification({ message: AuthenticationConstants.forgotPassword.mailSend });
  };

  return (
    <form onSubmit={forgotPasswordForm.onSubmit(sendResetPassword)}>
      <Stack gap="xs">
        <TextInput label={AuthenticationConstants.emailAddressLabel} {...forgotPasswordForm.getInputProps('email')} />
        <Button type="submit" loading={isLoading}>
          {AuthenticationConstants.forgotPassword.resetPasswordButton}
        </Button>
        <Button variant="link" onClick={() => toggleForm(FORM_TYPES.login)}>
          {AuthenticationConstants.alreadyAnAccountLink}
        </Button>
      </Stack>
    </form>
  );
};

export default ForgotPasswordForm;
