import { useMemo, useState } from 'react';

import { useToggle } from '@mantine/hooks';

import { showErrorNotification } from '@lib/notifications';

import supabase from '@constants/supabase';

import { FORM_TYPES } from './Authentication.constants';
import { allProviders } from './providers';

export const useAuthHooks = ({ providers }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, toggleForm] = useToggle(Object.keys(FORM_TYPES));

  const loginWithSocial = async (provider) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    setIsLoading(false);
    if (error) {
      return showErrorNotification({ message: error.message });
    }
  };

  const filteredProviders = useMemo(
    () => Object.entries(allProviders).filter(([key]) => providers.includes(key)),
    [providers]
  );

  return {
    isLoading,
    form,
    toggleForm,
    loginWithSocial,
    filteredProviders,
  };
};
