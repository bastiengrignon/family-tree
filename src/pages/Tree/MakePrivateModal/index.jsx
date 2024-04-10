import { IconLock, IconLockOpen } from '@tabler/icons-react';
import React from 'react';

import { Button, Modal, Stack, Text, TextInput } from '@mantine/core';

import { useMakePrivateModalHooks } from './MakePrivateModal.hooks';
import { TreeConstants } from '../Tree.constants';

const MakePrivateModal = ({ opened, onClose, code }) => {
  const { addCodeToTree, makePrivateForm } = useMakePrivateModalHooks({ onClose, code });
  return (
    <Modal opened={opened} onClose={onClose} title={TreeConstants.modalMakePrivate.title}>
      <form onSubmit={makePrivateForm.onSubmit(addCodeToTree)}>
        <Stack>
          <Text c="dimmed">{TreeConstants.modalMakePrivate.description}</Text>
          <TextInput label={TreeConstants.modalMakePrivate.inputCodeLabel} {...makePrivateForm.getInputProps('code')} />
          <Button
            type="submit"
            rightSection={
              makePrivateForm.values.code?.length === 0 ? <IconLockOpen size={20} /> : <IconLock size={20} />
            }>
            {makePrivateForm.values.code?.length === 0
              ? TreeConstants.modalMakePrivate.buttonMakePublic
              : TreeConstants.modalMakePrivate.buttonMakePrivate}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default MakePrivateModal;
