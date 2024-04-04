import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';

import { showErrorNotification, showSuccessNotification } from '@lib/notifications';

import supabase from '@constants/supabase';
import { treeSlice } from '@store/tree';
import { treeSelector } from '@store/tree/selectors';

import { TreeConstants } from './Tree.constants';

export const useTreeHooks = ({ openUnauthorizedModal }) => {
  const dispatch = useDispatch();
  const { treeId } = useParams();
  const [session] = useOutletContext();
  const tree = useSelector(treeSelector);

  const [treeMembers, setTreeMembers] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);

  useEffect(() => {
    const checkUserAccess = async () => {
      const { data, error } = await supabase.from('tree_users').select().eq('userId', session.user.id).select();
      if (error) {
        return showErrorNotification({ message: error.message });
      }
      setIsUserAuthorized(data.length !== 0);
      data.length === 0 && openUnauthorizedModal();
    };

    checkUserAccess();
  }, [session.user.id, openUnauthorizedModal]);

  useEffect(() => {
    const getTree = async () => {
      const { data, error } = await supabase.from('tree').select().eq('id', treeId).single();
      if (error) {
        return showErrorNotification({ message: error.message });
      }
      setAdmin(data.adminId);
      dispatch(treeSlice.actions.setTree(data));
    };

    if (isUserAuthorized) {
      getTree();
    }
  }, [dispatch, isUserAuthorized, treeId]);

  useEffect(() => {
    const getTreeMembers = async () => {
      const { data, error } = await supabase
        .from('tree_users')
        .select('profiles(id, firstName, lastName, avatarUrl)')
        .eq('treeId', treeId);
      if (error) {
        return showErrorNotification({ message: error.message });
      }
      setTreeMembers(data);
    };

    if (isUserAuthorized) {
      getTreeMembers();
    }
  }, [isUserAuthorized, treeId]);

  const updateTreeName = async (name) => {
    if (!admin) {
      return showErrorNotification({ message: TreeConstants.error.onlyAdminAllowed });
    }
    const { data, error } = await supabase
      .from('tree')
      .update({
        name,
      })
      .eq('id', treeId)
      .select()
      .single();
    if (error) {
      return showErrorNotification({ message: error.message });
    }
    dispatch(treeSlice.actions.setTree(data));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showSuccessNotification({ message: 'Copié avec succès' });
    } catch (error) {
      showErrorNotification({ message: 'Erreur de copie' });
    }
  };

  return {
    tree,
    updateTreeName,
    treeMembers,
    admin,
    isAdmin: admin === session.user.id,
    isPublicTree: tree.code === null || tree.code === '',
    copyToClipboard,
  };
};
