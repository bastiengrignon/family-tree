import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { showErrorNotification } from '@lib/notifications';

import supabase from '@constants/supabase';
import { userSlice } from '@store/user';
import { userSelector } from '@store/user/selectors';

import { routersPath } from '../../router';

export const useHeaderHooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    dispatch(userSlice.actions.logoutUser());
    if (error) {
      return showErrorNotification({ message: error.message });
    }
  };

  const gotToAccountPage = () => navigate(routersPath.account);

  return {
    user,
    userMenuOpened,
    setUserMenuOpened,
    logout,
    gotToAccountPage,
  };
};
