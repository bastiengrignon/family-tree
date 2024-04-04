import React from 'react';

import { Card, SimpleGrid, Title } from '@mantine/core';

import GenerateOrJoinTree from '@components/GenerateOrJoinTree';
import TreeList from '@components/TreeList';

import { HomeConstants } from './Home.constants';

const Home = () => (
  <SimpleGrid cols={{ base: 1, sm: 2 }}>
    <Card>
      <Title>{HomeConstants.trees.title}</Title>
      <TreeList />
    </Card>
    <Card>
      <GenerateOrJoinTree />
    </Card>
  </SimpleGrid>
);

export default Home;
