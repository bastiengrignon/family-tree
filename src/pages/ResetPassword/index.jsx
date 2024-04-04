import React, { useEffect, useState } from 'react';

import { Button, Card, Center, PasswordInput, Stack, Title } from '@mantine/core';
import { matches, matchesField, useForm } from '@mantine/form';

import { AuthenticationConstants } from '@components/Authentication/Authentication.constants';
import { showErrorNotification, showSuccessNotification } from '@lib/notifications';

import { passwordRegexp } from '@constants/regex';
import supabase from '@constants/supabase';

import {
  MODIFIED_PASSWORD_SUCCESS,
  RESET_PASSWORD_BUTTON,
  RESET_PASSWORD_CONFIRM_PASSWORD_LABEL,
  RESET_PASSWORD_PASSWORD_LABEL,
  RESET_PASSWORD_TITLE,
} from './ResetPassword.constants';
import classes from './ResetPassword.module.scss';

const ResetPassword = () => {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const resetPasswordForm = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validateInputOnBlur: true,
    validate: {
      password: matches(passwordRegexp, AuthenticationConstants.formValidation.password),
      confirmPassword: matchesField('password', AuthenticationConstants.formValidation.confirmPassword),
    },
  });

  const resetUserPassword = async ({ password }) => {
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({
      password,
    });
    setIsLoading(false);
    if (error) {
      return showErrorNotification({ message: error.message });
    }
    showSuccessNotification({ message: MODIFIED_PASSWORD_SUCCESS });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      console.log({ hashParams });
      setAccessToken(hashParams.get('access_token') || '');
      setRefreshToken(hashParams.get('refresh_token') || '');
    }
  }, []);

  useEffect(() => {
    const getSessionWithTokens = async () => {
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          alert(`Error signing in: ${error.message}`);
        }
      }
    };

    if (accessToken && refreshToken) {
      getSessionWithTokens();
    }
  }, [accessToken, refreshToken]);

  return (
    <form onSubmit={resetPasswordForm.onSubmit(resetUserPassword)}>
      <Center>
        <Card className={classes.cardContainer}>
          <Stack>
            <Center>
              <Title order={2}>{RESET_PASSWORD_TITLE}</Title>
            </Center>
            <PasswordInput label={RESET_PASSWORD_PASSWORD_LABEL} />
            <PasswordInput label={RESET_PASSWORD_CONFIRM_PASSWORD_LABEL} />
            <Button type="submit" loading={isLoading}>
              {RESET_PASSWORD_BUTTON}
            </Button>
          </Stack>
        </Card>
      </Center>
    </form>
  );
};

export default ResetPassword;
