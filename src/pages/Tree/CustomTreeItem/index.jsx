import { registerNode } from '@antv/g6';
import { Group, Rect, Text, Circle, Image, createNodeFromReact } from '@antv/g6-react-node';
import React from 'react';

const ReactNode = ({ cfg = {} }) => {
  const { description, meta = {}, label = 'label' } = cfg;
  return (
    <Group>
      <Rect>
        <Rect
          style={{
            width: 150,
            height: 20,
            fill: cfg.color,
            radius: [6, 6, 0, 0],
            cursor: 'move',
            stroke: cfg.color,
          }}
          draggable>
          <Text
            style={{
              marginTop: 2,
              marginLeft: 75,
              textAlign: 'center',
              fontWeight: 'bold',
              fill: '#fff',
            }}>
            {label}
          </Text>
        </Rect>
        <Rect
          style={{
            width: 150,
            height: 55,
            stroke: cfg.color,
            fill: '#ffffff',
            radius: [0, 0, 6, 6],
          }}>
          <Text style={{ marginTop: 5, fill: '#333', marginLeft: 4 }}>Desc: {description}</Text>
          <Text style={{ marginTop: 10, fill: '#333', marginLeft: 4 }}>Creator: {meta.creatorName}</Text>
        </Rect>
      </Rect>
      <Circle
        style={{
          stroke: cfg.color,
          r: 10,
          fill: '#fff',
          marginLeft: 75,
          cursor: 'pointer',
        }}
        name="circle">
        <Image
          style={{
            img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
            width: 12,
            height: 12,
            marginLeft: 69,
            marginTop: -5,
          }}
        />
      </Circle>
    </Group>
  );
};
registerNode('yourNode', createNodeFromReact(ReactNode));
/*
const TreeItemCard = ({
  cfg,
  name = 'Bastien Grignon',
  youngGirlName = null,
  sex = 'M',
  birthDate = '28/12/1997',
  deathDate = null,
}) => (
  <G6Group draggable>
    <Card
      padding="xs"
      radius="md"
      className={clsx(classes.treeItem, {
        [classes.treeItemGirl]: sex === 'F',
      })}
      withBorder>
      <Group gap="xs" justify="space-between" align="flex-start">
        <Group gap="xs">
          <Avatar radius="md" color="green" variant="gradient" size="md" />
          <Flex direction="column">
            <Tooltip label={youngGirlName} withArrow disabled={!youngGirlName}>
              <Text size="sm">{name}</Text>
            </Tooltip>
            <Text size="xs" fs="italic">
              {birthDate}
            </Text>
          </Flex>
        </Group>
        {deathDate && (
          <Tooltip label="22/06/2076" withArrow position="left">
            <IconGrave2 className={classes.defaultIconSize} />
          </Tooltip>
        )}
      </Group>
    </Card>
  </G6Group>
);*/

// registerNode('customNode', createNodeFromReact(CustomTreeItem));
