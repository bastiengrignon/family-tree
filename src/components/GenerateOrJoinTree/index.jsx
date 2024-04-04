import { IconArrowRight } from '@tabler/icons-react';
import React from 'react';

import { ActionIcon, Button, Center, Divider, Group, Modal, Stack, TextInput, Title } from '@mantine/core';

import { GenerateOrJoinTreeConstants } from './GenerateOrJoinTree.constants';
import { useGenerateOrJoinTreeHooks } from './GenerateOrJoinTree.hooks';
import classes from '../../global.module.scss';

const GenerateOrJoinTree = () => {
  const {
    joinTreeForm,
    generateTree,
    isGenerateLoading,
    checkTreeCode,
    openedGoToTreeModal,
    openGoToTreeModal,
    closeGoToTreeModal,
    entryCode,
    setEntryCode,
    errorCode,
  } = useGenerateOrJoinTreeHooks();

  return (
    <>
      <Stack>
        <Center>
          <Title order={2}>{GenerateOrJoinTreeConstants.generate.title}</Title>
        </Center>
        <Center>
          <Button onClick={generateTree} loading={isGenerateLoading}>
            {GenerateOrJoinTreeConstants.generate.button}
          </Button>
        </Center>

        <Divider label={GenerateOrJoinTreeConstants.or} />

        <Center>
          <Title order={2}>{GenerateOrJoinTreeConstants.join.title}</Title>
        </Center>

        <form onSubmit={joinTreeForm.onSubmit(openGoToTreeModal)}>
          <TextInput
            label={GenerateOrJoinTreeConstants.join.inputLabel}
            placeholder={GenerateOrJoinTreeConstants.join.inputPlaceholder}
            rightSection={
              <ActionIcon size={32} radius="xl" variant="light" type="submit">
                <IconArrowRight className={classes.defaultIconSize} />
              </ActionIcon>
            }
            {...joinTreeForm.getInputProps('link')}
          />
        </form>
      </Stack>
      <Modal
        opened={openedGoToTreeModal}
        onClose={closeGoToTreeModal}
        title={GenerateOrJoinTreeConstants.modalJoinTree.title}>
        <TextInput
          data-autofocus
          error={errorCode}
          value={entryCode}
          onChange={setEntryCode}
          label={GenerateOrJoinTreeConstants.modalJoinTree.inputCode}
        />
        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={closeGoToTreeModal}>
            {GenerateOrJoinTreeConstants.modalJoinTree.cancelButton}
          </Button>
          <Button onClick={checkTreeCode}>{GenerateOrJoinTreeConstants.modalJoinTree.confirmButton}</Button>
        </Group>
      </Modal>
    </>
  );
};

export default GenerateOrJoinTree;
