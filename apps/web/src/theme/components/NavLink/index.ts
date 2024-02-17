import { NavLink } from '@mantine/core';

import classes from './index.module.css';

export default NavLink.extend({
  defaultProps: {
    variant: 'filled',
  },
  classNames: {
    root: classes.root,
  },
  vars: (theme, props) => {
    if (props.variant === 'filled') {
      return { root: {
        '--nl-color': props.active ? 'var(--mantine-color-black)' : theme.other.black[300],
        '--nl-hover': props.active ? theme.other.black[100] : 'transparent',
        '--nl-bg': props.active ? theme.other.black[100] : 'transparent',
      },
      children: {} };
    }

    return { root: {}, children: {} };
  },
});
