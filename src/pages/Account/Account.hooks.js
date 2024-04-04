import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '@mantine/form';

import { showErrorNotification } from '@lib/notifications';

import supabase from '@constants/supabase';
import { userSlice } from '@store/user';
import { userSelector } from '@store/user/selectors';

export const useAccountHooks = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const profileForm = useForm({
    initialValues: {
      avatarUrl: user.avatarUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  const updateProfile = async ({ firstName, lastName }) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        firstName,
        lastName,
      })
      .eq('id', user.id)
      .select('id, email, firstName, lastName, fullName, avatarUrl')
      .single();
    if (error) {
      return showErrorNotification({ message: error.message });
    }
    dispatch(
      userSlice.actions.setUser({
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: `${data.firstName} ${data.lastName}`,
        avatarUrl: data.avatarUrl,
      })
    );
  };

  const deleteAccount = async () => {
    //Todo: Find a way to delete the user in auth table
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      return showErrorNotification({ message: error.message });
    }
  };

  return {
    updateProfile,
    profileForm,
    deleteAccount,
  };
};
