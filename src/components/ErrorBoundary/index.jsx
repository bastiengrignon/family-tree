import { IconCaretRightFilled } from '@tabler/icons-react';
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

import {
  Button,
  Card,
  Center,
  Collapse,
  Container,
  Group,
  Space,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import classes from '../../global.module.scss';
import { routersPath } from '../../router.jsx';

const ErrorBoundary = () => {
  const error = useRouteError();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Container h="100vh">
      <Title ta="center">Une erreur est survenue</Title>
      <Space h="xl" />
      <Center>
        <Stack>
          <Card w="100%" withBorder component={UnstyledButton} onClick={toggle}>
            <Group gap="xs">
              <IconCaretRightFilled className={classes.defaultIconSize} />
              <div>Erreur:</div>
            </Group>
            <Collapse in={opened}>
              <Text>{error.toString()}</Text>
            </Collapse>
          </Card>
        </Stack>
      </Center>
      <Space h="xl" />
      <Center>
        <Button variant="gradient" component={Link} to={routersPath.home}>
          Retour à la page d’accueil
        </Button>
      </Center>
    </Container>
  );
};

export default ErrorBoundary;
