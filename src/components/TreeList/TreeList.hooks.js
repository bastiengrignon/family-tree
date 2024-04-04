import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

import { showErrorNotification } from '@lib/notifications';

import supabase from '@constants/supabase';
import { treeSlice } from '@store/tree';
import { treesSelector } from '@store/tree/selectors';

export const useTreeListHooks = () => {
  const dispatch = useDispatch();
  const [session] = useOutletContext();
  const trees = useSelector(treesSelector);

  useEffect(() => {
    const getTrees = async () => {
      const { data: treeIds, error } = await supabase.from('tree_users').select('treeId').eq('userId', session.user.id);
      if (error) {
        return showErrorNotification({ message: error.message });
      }
      const { data, error: errorTree } = await supabase
        .from('tree')
        .select('id, name, profiles(id, firstName, lastName, avatarUrl),adminId, code, tree_users(count)')
        .in(
          'id',
          treeIds.map(({ treeId }) => treeId)
        );
      if (errorTree) {
        return showErrorNotification({ message: errorTree.message });
      }
      dispatch(treeSlice.actions.setTrees({ trees: data }));
    };

    getTrees();
  }, [dispatch, session]);

  return {
    trees,
  };
};
