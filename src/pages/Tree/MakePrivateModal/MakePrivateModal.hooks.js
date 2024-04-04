import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { showErrorNotification } from '@lib/notifications';

import supabase from '@constants/supabase';
import { treeSlice } from '@store/tree';

import { TreeConstants } from '../Tree.constants';

export const useMakePrivateModalHooks = ({ onClose, code }) => {
  const { treeId } = useParams();
  const dispatch = useDispatch();

  const makePrivateForm = useForm({
    initialValues: {
      code: code ?? '',
    },
  });

  useEffect(() => {
    makePrivateForm.setValues({
      code,
    });
  }, [code]);

  const addCodeToTree = async ({ code }) => {
    const { error } = await supabase
      .from('tree')
      .update({
        code,
      })
      .eq('id', treeId);
    if (error) {
      return showErrorNotification({ message: error.message });
    }
    dispatch(treeSlice.actions.updateCurrentTreeCode({ code }));
    onClose();
    notifications.show({ title: TreeConstants.modalMakePrivate.notification.title(code.length !== 0), color: 'green' });
  };

  return {
    makePrivateForm,
    addCodeToTree,
  };
};
