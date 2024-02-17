import { createTheme, rem } from '@mantine/core';

import * as components from './components';

const mainTheme = createTheme({
  fontFamily: 'Inter, sans-serif',
  fontFamilyMonospace: 'monospace',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: {
        fontSize: rem(26),
      },
    },
  },
  lineHeights: {
    md: '1.45',
  },
  primaryColor: 'blue',
  primaryShade: 6,
  defaultRadius: 'md',
  components,
});

export default mainTheme;
