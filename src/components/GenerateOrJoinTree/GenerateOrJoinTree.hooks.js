import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { matches, useForm } from '@mantine/form';
import { useDisclosure, useInputState } from '@mantine/hooks';

import { showErrorNotification } from '@lib/notifications';
import { replaceTemplatePathToRealPath } from '@lib/string';

import { httpStatus } from '@constants/httpStatus';
import { treeLinkRegexp } from '@constants/regex';
import supabase from '@constants/supabase';

import { GenerateOrJoinTreeConstants } from './GenerateOrJoinTree.constants';
import { routersPath } from '../../router';

export const useGenerateOrJoinTreeHooks = () => {
  const navigate = useNavigate();
  const [session] = useOutletContext();
  const [isGenerateLoading, setIsGenerateLoading] = useState(false);
  const [entryCode, setEntryCode] = useInputState('');
  const [errorCode, setErrorCode] = useState(null);
  const [openedGoToTreeModal, { open: openGoToTreeModal, close: closeGoToTreeModal }] = useDisclosure(false);

  const joinTreeForm = useForm({
    initialValues: { link: '' },
    validateInputOnChange: true,
    validate: {
      link: matches(treeLinkRegexp, GenerateOrJoinTreeConstants.join.error.link),
    },
  });

  const checkTreeCode = async () => {
    const treeId = joinTreeForm.values.link.split('tree/').pop();
    const { error: errorCheck, status: statusCheck } = await supabase
      .from('tree')
      .select()
      .eq('id', treeId)
      .eq('code', entryCode)
      .single();
    if (errorCheck && statusCheck === httpStatus.notAcceptable) {
      return setErrorCode(GenerateOrJoinTreeConstants.modalJoinTree.errorCode);
    }
    setErrorCode(null);
    await joinTree({ treeId });
  };

  const joinTree = async ({ treeId }) => {
    const { error, status } = await supabase
      .from('tree_users')
      .insert([{ treeId, userId: session.user.id }])
      .select()
      .single();
    if (error) {
      if (status === httpStatus.conflict) {
        return showErrorNotification({ message: GenerateOrJoinTreeConstants.join.error.conflictTree });
      }
      return showErrorNotification({ message: error.message });
    }
    navigate(replaceTemplatePathToRealPath(routersPath.tree, treeId));
  };

  const generateTree = async () => {
    setIsGenerateLoading(true);
    const { data: treeData, error: treeError } = await supabase
      .from('tree')
      .insert({
        name: GenerateOrJoinTreeConstants.generate.generatedName,
        nodes: {},
        adminId: session.user.id,
      })
      .select()
      .single();
    if (treeError) {
      return showErrorNotification({ message: treeError.message });
    }
    const { error: treeAdminError } = await supabase.from('tree_users').insert({
      treeId: treeData.id,
      userId: session.user.id,
    });
    if (treeAdminError) {
      return showErrorNotification({ message: treeAdminError.message });
    }
    setIsGenerateLoading(false);
    navigate(replaceTemplatePathToRealPath(routersPath.tree, treeData.id));
  };

  return {
    checkTreeCode,
    joinTreeForm,
    isGenerateLoading,
    generateTree,
    entryCode,
    setEntryCode,
    errorCode,
    openedGoToTreeModal,
    openGoToTreeModal,
    closeGoToTreeModal,
  };
};
