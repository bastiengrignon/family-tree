import {
  IconArrowLeft,
  IconLock,
  IconLockOpen,
  IconLogout,
  IconSettings,
  IconShare,
  IconTrash,
  IconUserPlus,
  IconUsers,
} from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { ActionIcon, Button, Card, Flex, Menu } from '@mantine/core';

import AddUserModal from '@pages/Tree/AddUserModal/index.jsx';

import ConditionalInput from '@components/ConditionalInput';

import MakePrivateModal from './MakePrivateModal';
import { BACK_BUTTON_LABEL, TreeConstants } from './Tree.constants';
import { useTreeGraphHooks } from './Tree.graphHooks';
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
    openedAddUserModal,
    openAddUserModal,
    closeAddUserModal,
  } = useTreeModalHooks();
  const { tree, updateTreeName, treeMembers, admin, isAdmin, isPublicTree, copyToClipboard } = useTreeHooks({
    openUnauthorizedModal,
  });

  const { graphRef, width, height } = useTreeGraphHooks();

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

      <Card padding="xs" mt="md" className={classes.treeContainer} withBorder>
        <Flex>
          <Button size="xs" rightSection={<IconUserPlus size={16} />} onClick={openAddUserModal}>
            Ajouter une personne
          </Button>
        </Flex>
        <div className={classes.graphContainer} ref={graphRef} style={{ width: width - 70, height: height - 200 }}>
          <div
            id="toolbarID"
            style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', height: 'auto', width: 225 }}
          />
        </div>
      </Card>

      <UnAuthorizedModal opened={openedUnauthorizedModal} onClose={closeUnauthorizedModal} />
      <TreeMembersModal
        opened={openedTreeMembersModal}
        onClose={closeTreeMembersModal}
        treeMembers={treeMembers}
        adminId={admin}
      />
      <MakePrivateModal opened={openedMakePrivateModal} onClose={closeMakePrivateModal} code={tree.code} />
      <AddUserModal opened={openedAddUserModal} onClose={closeAddUserModal} />
    </>
  );
};

export default Tree;
