import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';

import { notifications } from '@mantine/notifications';

export const showErrorNotification = ({ title = 'Une erreur est survenue', message }) => {
  notifications.show({
    title,
    message,
    color: 'red',
    icon: <IconX />,
    withBorder: true,
  });
};

export const showSuccessNotification = ({ message }) => {
  notifications.show({
    title: message,
    color: 'green',
    icon: <IconCheck />,
    withBorder: true,
  });
};
