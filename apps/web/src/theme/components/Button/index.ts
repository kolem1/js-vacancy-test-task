import { Button } from '@mantine/core';

import classes from './index.module.css';

export default Button.extend({
  defaultProps: {
    size: 'lg',
    variant: 'primary',
  },
  classNames: {
    root: classes.root,
    label: classes.label,
  },
  vars: (theme, props) => {
    if (props.variant === 'primary') {
      return { root: {
        '--button-bg': theme.other.blue[600],
        '--button-hover': theme.other.blue[500],
        '--button-active': theme.other.blue[700],
      } };
    }

    if (props.variant === 'secondary') {
      return {
        root: {
          '--button-bg': 'var(--mantine-color-white)',
          '--button-color': theme.other.black[400],
          '--button-hover': 'var(--mantine-color-white)',
          '--button-hover-color': theme.other.blue[600],
          '--button-bd': `1px solid ${theme.other.black[400]}`,
        },
      };
    }

    return { root: {} };
  },
});
