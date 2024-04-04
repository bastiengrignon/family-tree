import { IconUserStar } from '@tabler/icons-react';
import React from 'react';

import { Avatar, Flex, Group, Modal, Stack, Text } from '@mantine/core';

import { firstLetterWord } from '@lib/string';

import { TreeConstants } from '../Tree.constants';

const TreeMembersModal = ({ opened, onClose, treeMembers, adminId }) => (
  <Modal opened={opened} onClose={onClose} title={TreeConstants.modalMembers.title}>
    <Stack>
      {treeMembers.map((members, index) => (
        <Flex justify="space-between" key={index}>
          <Group>
            <Avatar src={members.profiles.avatarUrl}>
              {firstLetterWord(members.profiles.firstName)} {firstLetterWord(members.profiles.lastName)}
            </Avatar>
            <Text>
              {members.profiles.firstName} {members.profiles.lastName}
            </Text>
          </Group>
          {adminId === members.profiles.id && <IconUserStar color="gold" />}
        </Flex>
      ))}
    </Stack>
  </Modal>
);

export default TreeMembersModal;
