import { IconArrowBackUp, IconDeviceFloppy, IconEdit } from '@tabler/icons-react';
import React from 'react';

import { ActionIcon, Group, TextInput, Title } from '@mantine/core';

import { useConditionalInputHooks } from './ConditionalInput.hooks';

const ConditionalInput = ({ name, onSave, editable = false }) => {
  const { isEditing, setIsEditing, inputName, setInputName, save, ref } = useConditionalInputHooks({
    name,
    onSave,
  });
  return (
    <Group gap="xs">
      {isEditing ? (
        <TextInput
          ref={ref}
          variant="filled"
          size="xl"
          value={inputName}
          onChange={({ target: { value } }) => setInputName(value)}
        />
      ) : (
        <Title order={2}>{inputName}</Title>
      )}
      {isEditing && (
        <ActionIcon variant="subtle" radius="xl" onClick={() => setIsEditing(false)}>
          <IconArrowBackUp />
        </ActionIcon>
      )}
      {editable && (
        <ActionIcon variant="subtle" radius="xl" onClick={() => (isEditing ? save() : setIsEditing(true))}>
          {isEditing ? <IconDeviceFloppy /> : <IconEdit />}
        </ActionIcon>
      )}
    </Group>
  );
};

export default ConditionalInput;
