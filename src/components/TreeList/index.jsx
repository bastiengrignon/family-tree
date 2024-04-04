import { IconLock } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Flex, Group, Table, Title, Tooltip } from '@mantine/core';

import { firstLetterWord, replaceTemplatePathToRealPath } from '@lib/string';

import { useTreeListHooks } from './TreeList.hooks';
import classes from './TreeList.module.scss';
import { routersPath } from '../../router';

const TreeList = () => {
  const { trees } = useTreeListHooks();
  return (
    <Table striped>
      <Table.Tbody>
        {trees.map((tree) => (
          <Table.Tr key={tree.id}>
            <Table.Td>
              <Link to={replaceTemplatePathToRealPath(routersPath.tree, tree.id)} className={classes.treeLink}>
                <Flex align="center" justify="space-between">
                  <Group gap="xs">
                    <Title order={5}>{tree.name}</Title>
                    {tree.code && <IconLock className={classes.iconLock} />}
                  </Group>
                  <Tooltip label={`${tree.profiles.firstName} ${tree.profiles.lastName}`} withArrow>
                    <Avatar size="sm" src={tree.profiles.avatarUrl}>
                      {firstLetterWord(tree.profiles.firstName)}
                      {firstLetterWord(tree.profiles.lastName)}
                    </Avatar>
                  </Tooltip>
                </Flex>
              </Link>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default TreeList;
