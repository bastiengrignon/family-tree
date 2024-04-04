import { useDisclosure } from '@mantine/hooks';

export const useTreeModalHooks = () => {
  const [openedTreeMembersModal, { open: openTreeMembersModal, close: closeTreeMembersModal }] = useDisclosure(false);
  const [openedUnauthorizedModal, { open: openUnauthorizedModal, close: closeUnauthorizedModal }] =
    useDisclosure(false);
  const [openedMakePrivateModal, { open: openMakePrivateModal, close: closeMakePrivateModal }] = useDisclosure(false);

  return {
    openedTreeMembersModal,
    openTreeMembersModal,
    closeTreeMembersModal,
    openedUnauthorizedModal,
    openUnauthorizedModal,
    closeUnauthorizedModal,
    openedMakePrivateModal,
    closeMakePrivateModal,
    openMakePrivateModal,
  };
};
