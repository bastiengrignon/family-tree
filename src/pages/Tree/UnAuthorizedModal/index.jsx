import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Center, Modal } from '@mantine/core';

import { routersPath } from '../../../router';
import { TreeConstants } from '../Tree.constants';

const UnAuthorizedModal = ({ opened, onClose }) => (
  <Modal opened={opened} onClose={onClose} title={TreeConstants.modalUnauthorized.title}>
    <Center>
      <Button component={Link} to={routersPath.home} color="red">
        {TreeConstants.modalUnauthorized.buttonBackHome}
      </Button>
    </Center>
  </Modal>
);
export default UnAuthorizedModal;
