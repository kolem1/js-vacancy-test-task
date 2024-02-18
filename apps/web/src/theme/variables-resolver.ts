import {
  CSSVariablesResolver,
} from '@mantine/core';

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-blue-10': theme.other.blue[10],
    '--mantine-blue-500': theme.other.blue[500],
    '--mantine-blue-600': theme.other.blue[600],
    '--mantine-blue-700': theme.other.blue[700],
    '--mantine-black-50': theme.other.black[50],
    '--mantine-black-100': theme.other.black[100],
    '--mantine-black-200': theme.other.black[200],
    '--mantine-black-300': theme.other.black[300],
    '--mantine-black-400': theme.other.black[400],
    '--mantine-black-600': theme.other.black[600],
  },
  dark: {},
  light: {},
});

export default resolver;
