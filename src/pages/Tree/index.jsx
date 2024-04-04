import {
  IconArrowLeft,
  IconLock,
  IconLockOpen,
  IconLogout,
  IconSettings,
  IconShare,
  IconTrash,
  IconUsers,
} from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { ActionIcon, Button, Card, Flex, Menu } from '@mantine/core';

import ConditionalInput from '@components/ConditionalInput';

import MakePrivateModal from './MakePrivateModal';
import { BACK_BUTTON_LABEL, TreeConstants } from './Tree.constants';
import { useTreeHooks } from './Tree.hooks';
import { useTreeModalHooks } from './Tree.modalHooks';
import classes from './Tree.module.scss';
import TreeMembersModal from './TreeMembersModal';
import UnAuthorizedModal from './UnAuthorizedModal';
import { routersPath } from '../../router';

const Tree = () => {
  const {
    openedTreeMembersModal,
    closeTreeMembersModal,
    openTreeMembersModal,
    openedUnauthorizedModal,
    closeUnauthorizedModal,
    openUnauthorizedModal,
    openedMakePrivateModal,
    closeMakePrivateModal,
    openMakePrivateModal,
  } = useTreeModalHooks();
  const { tree, updateTreeName, treeMembers, admin, isAdmin, isPublicTree, copyToClipboard } = useTreeHooks({
    openUnauthorizedModal,
  });

  return (
    <>
      <Flex justify="space-between">
        <Button
          my="xs"
          variant="light"
          size="xs"
          leftSection={<IconArrowLeft />}
          component={Link}
          to={routersPath.home}>
          {BACK_BUTTON_LABEL}
        </Button>
        <Menu withArrow width={300} position="left-start" transitionProps={{ transition: 'pop' }} withinPortal>
          <Menu.Target>
            <ActionIcon variant="light">
              <IconSettings className={classes.defaultIconSize} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconUsers className={classes.defaultIconSize} />} onClick={openTreeMembersModal}>
              {TreeConstants.menu.members}
            </Menu.Item>
            <Menu.Item leftSection={<IconShare className={classes.defaultIconSize} />} onClick={copyToClipboard}>
              {TreeConstants.menu.share}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>{TreeConstants.menu.dangerZone}</Menu.Label>
            <Menu.Item
              leftSection={
                isPublicTree ? (
                  <IconLock className={classes.defaultIconSize} />
                ) : (
                  <IconLockOpen className={classes.defaultIconSize} />
                )
              }
              disabled={!isAdmin}
              onClick={openMakePrivateModal}>
              {isPublicTree ? TreeConstants.menu.makePrivate : TreeConstants.menu.makePublic}
            </Menu.Item>
            <Menu.Item disabled leftSection={<IconLogout className={classes.defaultIconSize} />}>
              {TreeConstants.menu.quitTree}
            </Menu.Item>
            {isAdmin && (
              <Menu.Item color="red" leftSection={<IconTrash className={classes.defaultIconSize} />}>
                {TreeConstants.menu.deleteTree}
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <ConditionalInput name={tree.name} onSave={updateTreeName} editable={isAdmin} />

      <Card padding="xs" mt="md" className={classes.treeContainer} id="treeGraph">
        Test
      </Card>

      <UnAuthorizedModal opened={openedUnauthorizedModal} onClose={closeUnauthorizedModal} />
      <TreeMembersModal
        opened={openedTreeMembersModal}
        onClose={closeTreeMembersModal}
        treeMembers={treeMembers}
        adminId={admin}
      />
      <MakePrivateModal opened={openedMakePrivateModal} onClose={closeMakePrivateModal} code={tree.code} />
    </>
  );
};

export default Tree;
