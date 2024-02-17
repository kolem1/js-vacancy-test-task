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
  black: '#201F22',
  other: {
    black: { 50: '#FCFCFC', 100: '#ECECEE', 200: '#CFCFCF', 300: '#A3A3A3', 400: '#767676', 600: '#201F22' },
    blue: { 10: '#EAF1FD', 500: '#5692EF', 600: '#2B77EB', 700: '#235FBC' },
  },
});

export default mainTheme;
