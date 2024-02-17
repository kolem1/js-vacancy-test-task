import { Button } from '@mantine/core';

import classes from './index.module.css';

export default Button.extend({
  defaultProps: {
    size: 'lg',
  },
  classNames: {
    root: classes.root,
    label: classes.label,
  },
  vars: (theme, props) => {
    if (props.variant === 'filled') {
      return ({ root: {
        '--button-bg': theme.other.blue[600],
        '--button-hover': theme.other.blue[500],
        '--button-active': theme.other.blue[700],
      } });
    }

    return { root: {} };
  },
});
