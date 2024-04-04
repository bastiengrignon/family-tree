import { Button, createTheme } from '@mantine/core';

import classes from './global.module.scss';

const theme = createTheme({
  primaryColor: 'blue',
  components: {
    TextInput: {
      defaultProps: {
        radius: 'xl',
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'xl',
      },
    },
    Button: {
      ...Button.extend({ classNames: { root: classes.buttonLinkVariant } }),
      defaultProps: {
        radius: 'xl',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'lg',
        padding: 'lg',
      },
    },
  },
});

export default theme;
