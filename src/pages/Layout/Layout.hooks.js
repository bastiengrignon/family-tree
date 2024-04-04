import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { convertFullNameToFirstAndLastName } from '@lib/string';

import supabase from '@constants/supabase';
import { userSlice } from '@store/user';

import { routersPath } from '../../router';

export const useLayoutHooks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (session) {
          const firstName =
            session.user.user_metadata.first_name ??
            convertFullNameToFirstAndLastName(session.user.user_metadata.full_name).firstName;
          const lastName =
            session.user.user_metadata.last_name ??
            convertFullNameToFirstAndLastName(session.user.user_metadata.full_name).lastName;
          const fullName =
            session.user.user_metadata.full_name ??
            `${session.user.user_metadata.first_name} ${session.user.user_metadata.last_name}`;
          dispatch(
            userSlice.actions.setUser({
              id: session.user.id,
              email: session.user.email,
              firstName,
              lastName,
              fullName,
              avatarUrl: session.user.user_metadata.avatar_url,
            })
          );
        }
        setSession(session);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
      } else if (event === 'PASSWORD_RECOVERY') {
        navigate(routersPath.resetPassword);
      }
    });
    return () => subscription.unsubscribe();
  }, [dispatch, navigate]);

  return {
    session,
  };
};
