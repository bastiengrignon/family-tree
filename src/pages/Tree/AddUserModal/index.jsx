import { IconPlus } from '@tabler/icons-react';
import React from 'react';

import { Button, Flex, Grid, Group, Modal, Select, Stack, Switch, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

import { AddUserModalConstants } from './AddUserModal.constants';
import { useAddUserModalHooks } from './AddUserModal.hooks';

const AddUserModal = ({ opened, onClose }) => {
  const { addUserForm, addUser, isWoman, isDead, setIsDead } = useAddUserModalHooks();

  return (
    <Modal opened={opened} onClose={onClose} title={AddUserModalConstants.modalTitle}>
      <form onSubmit={addUserForm.onSubmit(addUser)}>
        <Stack gap="xs">
          <Grid>
            <Grid.Col span={8}>
              <TextInput
                label={AddUserModalConstants.fullNameLabel}
                placeholder={AddUserModalConstants.fullNamePlaceholder}
                {...addUserForm.getInputProps('fullName')}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                radius="xl"
                label={AddUserModalConstants.sexLabel}
                allowDeselect={false}
                data={AddUserModalConstants.sexValues}
                {...addUserForm.getInputProps('sex')}
              />
            </Grid.Col>
          </Grid>
          <DatePickerInput
            radius="xl"
            label={AddUserModalConstants.birthDateLabel}
            placeholder={AddUserModalConstants.birthDatePlaceholder}
            valueFormat="D MMMM YYYY"
            {...addUserForm.getInputProps('birthDate')}
          />
          {isWoman && (
            <TextInput
              label={AddUserModalConstants.youngGirlLabel}
              placeholder={AddUserModalConstants.youngGirlPlaceholder}
              {...addUserForm.getInputProps('youngGirlName')}
            />
          )}
          <Flex gap="md" align="center" justify="space-between">
            <Switch size="md" label={AddUserModalConstants.switchDeadLabel} checked={isDead} onChange={setIsDead} />
            {isDead && (
              <DatePickerInput
                w="100%"
                radius="xl"
                placeholder={AddUserModalConstants.deathDateLabel}
                valueFormat="D MMMM YYYY"
                {...addUserForm.getInputProps('deathDate')}
              />
            )}
          </Flex>
          <Select
            label={AddUserModalConstants.relationSelectLabel}
            placeholder={AddUserModalConstants.relationSelectPlaceholder}
            data={AddUserModalConstants.relationSelectValues}
            {...addUserForm.getInputProps('relation')}
          />
          {addUserForm.values.relation !== '' && (
            <Flex>
              <Text>De</Text>
              <Select label="De" data={[]} />
            </Flex>
          )}
          <Group justify="flex-end">
            <Button type="submit" color={isWoman ? 'pink' : 'blue'} rightSection={<IconPlus size={16} />}>
              Ajouter
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddUserModal;
