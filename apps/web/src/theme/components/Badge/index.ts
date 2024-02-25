import { Badge } from '@mantine/core';

export default Badge.extend({
  defaultProps: {
    variant: 'filled',
  },
  vars: (_, props) => {
    if (props.variant === 'filled') {
      if (props.color === 'orange') {
        return {
          root: {
            '--badge-bg': '#FEF4E6',
            '--badge-color': '#F79009',
          },
        };
      }

      if (props.color === 'green') {
        return {
          root: {
            '--badge-bg': '#E8F7F0',
            '--badge-color': '#17B26A',
          },
        };
      }
    }

    return {
      root: {},
    };
  },
});
